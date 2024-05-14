from typing import Any, List

from pydantic import BaseModel


class InterventionRequestModel(BaseModel):

    name: str

    modules: List[str]

    args: List[Any] = []


class RequestModel(BaseModel):

    prompt: str
    seed: int = 42
    timesteps: int = 50

    interventions: List[InterventionRequestModel]
