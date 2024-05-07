from nnsight.envoy import Envoy
from . import DiffusionIntervention


class AblationIntervention(DiffusionIntervention):
    
    def intervene(self, envoy: Envoy):
        envoy.output[:] = 0