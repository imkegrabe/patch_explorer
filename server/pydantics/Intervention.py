from __future__ import annotations
from typing import Any, List

from pydantic import BaseModel
from enum import Enum

class FieldModel(BaseModel):
    
    class FieldType(Enum):
        
        string = 'string'
        float = 'float'
        integer = 'integer'
    
    name: str
    
    type: FieldModel.FieldType


class InterventionModel(BaseModel):

    name: str

    fields: List[FieldModel] = []

