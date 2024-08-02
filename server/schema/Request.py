from typing import Any, Dict, List, Tuple

from pydantic import BaseModel


class InterventionRequestModel(BaseModel):

    name: str

    selections: Dict[str, List[Tuple[int, int, int]]]

    args: List[Any] = []


class RequestModel(BaseModel):

    prompt: str
    seed: int = 42
    timesteps: int = 50

    interventions: List[InterventionRequestModel]
