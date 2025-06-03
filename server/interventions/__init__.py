from typing import Dict, List, Tuple

import torch

from nnsight import NNsight
from nnsight.intervention.envoy import Envoy


class DiffusionIntervention:

    def __init__(
        self,
        model: NNsight,
        envoys: List[Envoy],
        selections: Dict[str, Dict[int, List[str]]] = None,
        start_step: int = 0,
        end_step: int = 4,
    ) -> None:

        self.model = model
        self.envoys = envoys
        self.selections = selections
        self.start_step = start_step
        self.end_step = end_step

        if self.selections is not None:
            for module_name, value in self.selections.items():

                patches = []

                for head_idx, head_patches in enumerate(value):

                    head_patches = [
                        [patch, head_idx]
                        for patch in head_patches
                    ]

                    patches.extend(head_patches)

                self.selections[module_name] = tuple(torch.Tensor(patches).t().to(int))
        
        print(self.selections)
        
    def intervene(self, envoy: Envoy):
        pass

    def __call__(self):

        for envoy in self.envoys:

            with envoy.iter[self.start_step:self.end_step]:
        
                self.intervene(envoy)


    @classmethod
    def fields(cls):
        return []
