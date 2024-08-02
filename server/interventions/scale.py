import math

import torch

from nnsight.envoy import Envoy

from ..schema.Intervention import FieldModel
from . import DiffusionIntervention


def apply(hidden_states: torch.Tensor, factor, selection, attn):

    spatial_dim = int(math.sqrt(hidden_states.shape[1]))
    n_heads = attn.heads

    hidden_states = hidden_states.view(
        (hidden_states.shape[0], spatial_dim, spatial_dim, n_heads, -1)
    )

    # THis is effecting both the cond and uncond
    hidden_states[:, selection[0], selection[1], selection[2]] *= factor


class ScalingIntervention(DiffusionIntervention):

    def __init__(self, factor, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        self.factor = factor

    def intervene(self, attn_envoy: Envoy, tracer, *args):

        envoy = attn_envoy.to_out[0]

        # (batch, spatial * spatial, heads * dim)
        hidden_states: torch.Tensor = envoy.input[0][0]

        selection = self.selections[attn_envoy._module_path]

        tracer.apply(
            apply, hidden_states, self.factor, selection, attn_envoy, validate=False
        )

    @classmethod
    def fields(cls):

        return [FieldModel(name="Factor", type=FieldModel.FieldType.float)]
