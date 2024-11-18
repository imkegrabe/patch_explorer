from __future__ import annotations

from typing import Any, Dict, List

from pydantic import BaseModel, field_validator

from nnsight import NNsight
from nnsight import Envoy

from .Intervention import InterventionModel


class EnvoyModel(BaseModel):

    name: str

    type: str

    children: Dict[str, EnvoyModel]


class ConfigurationModel(BaseModel):

    interventions: List[InterventionModel]

    architecture: EnvoyModel

    @field_validator("architecture", mode="before")
    @classmethod
    def arch(cls, model: NNsight) -> str:

        def _arch(envoy: Envoy):

            return EnvoyModel(
                name=envoy.path,
                type=f"{type(envoy._module).__module__}.{type(envoy._module).__name__}",
                children={
                    _envoy.path: _arch(_envoy) for _envoy in envoy._children
                },
            )

        return _arch(model._envoy)
