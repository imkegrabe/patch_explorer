from typing import List
from nnsight.envoy import Envoy
from . import DiffusionIntervention


class EncoderIntervention(DiffusionIntervention):
    
    def __init__(self, replacement, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        
        self.replacement = replacement
    
    def intervene(self, envoy: Envoy):
        envoy.input[1]['encoder_hidden_states'] = self.replacement