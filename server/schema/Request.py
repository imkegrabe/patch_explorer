from typing import Any, Dict, List, Tuple, Union

from pydantic import BaseModel


class InterventionRequestModel(BaseModel):

    name: str

    selections: Dict[int, Dict[int, List[str]]]

    args: List[Any] = []


class RequestModel(BaseModel):

    prompt: str
    seed: int = 42
    timesteps: int = 50

    interventions: List[InterventionRequestModel]
