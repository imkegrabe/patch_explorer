from typing import List

from nnsight import Envoy, trace, log
import torch

from ..schema.Intervention import FieldModel
from ..util import encode_prompt
from . import DiffusionIntervention


class EncoderIntervention(DiffusionIntervention):

    def __init__(self, replacement_text, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        
        if replacement_text is None:
            replacement_text = ""
            
        self.replacement = encode_prompt(replacement_text, self.model)

    def intervene(self, attn_envoy: Envoy):

        envoy = attn_envoy


        selection = self.selections[attn_envoy.path]
        
        if len(selection) > 0:
            
            envoy.input = torch.cat([envoy.input, envoy.input[1:]])

            envoy.inputs[1]['encoder_hidden_states'] = torch.cat([envoy.inputs[1]['encoder_hidden_states'], self.replacement[1:]])
            
            hidden_states = envoy.to_out[0].input
            
            spatial_dim = hidden_states.shape[1]
            n_heads = envoy.heads

            hidden_states = hidden_states.view(
                (hidden_states.shape[0], spatial_dim, n_heads, -1)
            )

            hidden_states[1, selection[0], selection[1]] = hidden_states[2, selection[0], selection[1]]
            
            envoy.to_out[0].input = envoy.to_out[0].input[:2]

    @classmethod
    def fields(cls):

        return [FieldModel(name="Text", type=FieldModel.FieldType.string)]

