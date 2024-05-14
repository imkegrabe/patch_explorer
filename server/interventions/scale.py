from nnsight.envoy import Envoy
from ..pydantics.Intervention import FieldModel
from . import DiffusionIntervention


class ScalingIntervention(DiffusionIntervention):
    
    def __init__(self, factor, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)
        
        self.factor = factor
    
    def intervene(self, envoy: Envoy):
        envoy.output[:] = envoy.output*self.factor
    
    @classmethod
    def fields(cls):
        
        return [FieldModel(name="Factor", type = FieldModel.FieldType.float)]