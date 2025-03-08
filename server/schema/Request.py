from typing import Any, Dict, List, Tuple, Union

from pydantic import BaseModel


class InterventionRequestModel(BaseModel):

    name: str

    selections: List[List[List[int]]]

    args: List[Any] = []


class RequestModel(BaseModel):

    prompt: str
    seed: int = 42
    timesteps: int = 50
    start_step:int = 0
    end_step:int = 50

    interventions: List[InterventionRequestModel]
