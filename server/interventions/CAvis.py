from collections import defaultdict
from typing import Any, List

import torch
import math
from nnsight import Envoy

from . import DiffusionIntervention

def split(q, k , v, attn):
    
    
    q = attn.head_to_batch_dim(q)
    k = attn.head_to_batch_dim(k)
    v = attn.head_to_batch_dim(v)
    
    heads = attn.heads

    attn_probs = attn.get_attention_scores(q, k)
    
    # b: batch, t: tokens
    valued_attn_probs = torch.einsum(
        "bth, bst -> bsth", v, attn_probs
    )  # step between
    valued_attn_probs_sum = valued_attn_probs.sum(dim=2)  # addends

    valued_attn_probs_sum_cond = valued_attn_probs_sum[
        -heads:
    ]  # only for the conditional image
    
    # MLP WEIGHTS
    mlp_weights = attn.to_out[0].weight.to(torch.bfloat16)
    mlp_weights_byhead = mlp_weights.reshape(mlp_weights.shape[0], -1, heads)

    # # ADDENDUM BY HEAD AFTER MLP: h: heads, s: spatial (patches), d: head dim, o: residual dim
    addendum_byhead = torch.einsum( 
        "hsd, odh -> hs", valued_attn_probs_sum_cond, mlp_weights_byhead
    )
    
    spatial_dim = int(math.sqrt(addendum_byhead.shape[-1]))
    
    addendum_byhead = addendum_byhead.reshape((-1, spatial_dim, spatial_dim)).cpu()
        
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
        
        addendum_byhead = split(q, k, v, attn)    
        
        
        self.addends[attn.path].append(addendum_byhead.cpu())
        