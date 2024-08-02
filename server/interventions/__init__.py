from typing import Dict, List, Tuple

from nnsight import NNsight
from nnsight.contexts.Tracer import Tracer
from nnsight.envoy import Envoy
import torch


class DiffusionIntervention:

    def __init__(
        self,
        model: NNsight,
        envoys: List[Envoy],
        selections: Dict[str, List[Tuple[int, int, int]]] = None,
        start_step: int = 0,
        end_step: int = 50,
    ) -> None:

        self.model = model
        self.envoys = envoys
        self.selections = selections
        self.start_step = start_step
        self.end_step = end_step
        
        if self.selections is not None:
            for key, value in self.selections.items():
                
                self.selections[key] = tuple(torch.Tensor(value).t().to(int))

    def intervene(self, envoy: Envoy, tracer: Tracer, step: int):
        pass

    def __call__(self, tracer: Tracer):

        for envoy in self.envoys:
            
            envoy._reset()

            for i in range(self.start_step):
                envoy.next(propagate=True)

            for i in range(self.end_step - self.start_step):

                self.intervene(envoy, tracer, self.start_step + i)

                envoy.next(propagate=True)
                
            

    @classmethod
    def fields(cls):
        return []
