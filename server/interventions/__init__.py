from typing import List

from nnsight.envoy import Envoy
from nnsight import NNsight

class DiffusionIntervention:

    def __init__(
        self, model: NNsight, envoys: List[Envoy], start_step: int = 0, end_step: int = 50
    ) -> None:
    
        self.model = model
        self.envoys = envoys
        self.start_step = start_step
        self.end_step = end_step

    def intervene(self, envoy: Envoy):
        pass

    def __call__(self):

        for envoy in self.envoys:

            for i in range(self.start_step):
                envoy.next()

            for i in range(self.end_step - self.start_step):

                self.intervene(envoy)

                envoy.next()
                
    @classmethod
    def fields(cls):
        return []
