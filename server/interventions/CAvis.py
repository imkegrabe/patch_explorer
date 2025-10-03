from collections import defaultdict
from typing import Any, List

import torch
import math
from nnsight import Envoy

from . import DiffusionIntervention
_cached_mlp_weight_sums = {}

def _get_per_head_weight_sum(attn):
    """Return cached per-head summed out-projection weights.

    Computes sum over the output dimension once: W_sum[h, d] = sum_o W[o, d, h]
    Shapes:
      - attn.to_out[0].weight: [out_dim, in_dim]
      - reshaped to [out_dim, head_dim, heads] => sum over out_dim => [head_dim, heads]
      - transposed to [heads, head_dim]
    """
    weight = attn.to_out[0].weight
    key = (id(weight), attn.heads)
    cached = _cached_mlp_weight_sums.get(key)
    if cached is not None and cached.device == weight.device:
        return cached

    heads = attn.heads
    w = weight.to(torch.bfloat16).contiguous()
    # reshape to [out_dim, head_dim, heads]
    w_by_head = w.view(w.shape[0], -1, heads)
    # sum over out_dim -> [head_dim, heads] then transpose -> [heads, head_dim]
    per_head_sum = w_by_head.sum(dim=0).transpose(0, 1).contiguous()
    _cached_mlp_weight_sums[key] = per_head_sum
    return per_head_sum

def split(q, k , v, attn):
       
    # Move to [batch*heads, tokens, head_dim] and ensure contiguous for matmul
    q = attn.head_to_batch_dim(q).contiguous()
    k = attn.head_to_batch_dim(k).contiguous()
    v = attn.head_to_batch_dim(v).contiguous()

    heads = attn.heads

    # attn_probs: [batch*heads, spatial_tokens, tokens]
    attn_probs = attn.get_attention_scores(q, k)

    # Directly compute [batch*heads, spatial_tokens, head_dim] via bmm
    # (avoids forming a large [b, s, t, d] tensor and summing)
    valued_attn = torch.bmm(attn_probs, v)

    # Select only the conditional image portion: last `heads` in the batch*heads dim
    # Shape: [heads, spatial_tokens, head_dim]
    valued_attn_cond = valued_attn[-heads:]

    # Precompute per-head weight vector: [heads, head_dim]
    per_head_weight_sum = _get_per_head_weight_sum(attn)

    # For each head, contract over head_dim to get [heads, spatial_tokens]
    addendum_byhead = torch.bmm(
        valued_attn_cond, per_head_weight_sum.unsqueeze(-1)
    ).squeeze(-1)

    spatial_dim = int(math.sqrt(addendum_byhead.shape[-1]))
    addendum_byhead = addendum_byhead.reshape((-1, spatial_dim, spatial_dim))
        
    return addendum_byhead
        

class CustomDict(dict):
    
    def __init__(self):
        
        self.dict = {}
    
    
    def __getitem__(self, key: Any) -> Any:
        return self.dict.__getitem__(key)
    
    
    def __setitem__(self, key: Any, value: Any) -> None:
        return self.dict.__setitem__(key, value)
    
    def get(self, *args, **kwargs):
        return self.dict.get(*args, **kwargs)

class CAVisIntervention(DiffusionIntervention):

    def __init__(self, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        self.addends = defaultdict(list)

    def intervene(self, envoy: Envoy):

        attn = envoy

        q = attn.to_q.output.to(torch.bfloat16)
        k = attn.to_k.output.to(torch.bfloat16)
        v = attn.to_v.output.to(torch.bfloat16)
        
        addendum_byhead = split(q, k, v, attn._module)    
        
        
        self.addends[attn.path].append(addendum_byhead.cpu())
        