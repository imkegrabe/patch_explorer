from typing import Dict, List, Tuple

import torch

from nnsight import NNsight
from nnsight.contexts.Tracer import Tracer
from nnsight.envoy import Envoy


class DiffusionIntervention:

    def __init__(
        self,
        model: NNsight,
        envoys: List[Envoy],
        selections: Dict[str, Dict[int, List[str]]] = None,
        start_step: int = 0,
        end_step: int = 50,
    ) -> None:

        self.model = model
        self.envoys = envoys
        self.selections = selections
        self.start_step = start_step
        self.end_step = end_step

        if self.selections is not None:
            for module_name, value in self.selections.items():

                patches = []

                for head, head_patches in value.items():

                    head_patches = [
                        [int(x) for x in patch.split(",")] + [head]
                        for patch in head_patches
                    ]

                    patches.extend(head_patches)

                self.selections[module_name] = tuple(torch.Tensor(patches).t().to(int))

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
