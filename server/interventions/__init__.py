from typing import List

from nnsight.envoy import Envoy
from nnsight import NNsight
from nnsight.contexts.Tracer import Tracer

class DiffusionIntervention:

    def __init__(
        self, model: NNsight, envoys: List[Envoy], start_step: int = 0, end_step: int = 50
    ) -> None:
    
        self.model = model
        self.envoys = envoys
        self.start_step = start_step
        self.end_step = end_step

    def intervene(self, envoy: Envoy, tracer: Tracer, step:int):
        pass

    def __call__(self, tracer: Tracer):

        for envoy in self.envoys:

            for i in range(self.start_step):
                envoy.next(propagate=True)

            for i in range(self.end_step - self.start_step):

                self.intervene(envoy, tracer, self.start_step + i)

                envoy.next(propagate=True)
                
    @classmethod
    def fields(cls):
        return []
