from nnsight.envoy import Envoy
from . import DiffusionIntervention


class ReplacingIntervention(DiffusionIntervention):
    
    def __init__(self, factor, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        
        self.factor = factor
    
    def intervene(self, envoy: Envoy):
        return(envoy.output[:])