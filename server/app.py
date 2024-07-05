import base64
import importlib
from io import BytesIO
import json
from typing import Dict, List

import torch
import uvicorn
from fastapi import FastAPI, Response
from fastapi.responses import JSONResponse

from fastapi.middleware.cors import CORSMiddleware
from PIL.Image import Image

from nnsight.util import fetch_attr

from . import util
from .interventions import DiffusionIntervention
from .interventions.ablate import AblationIntervention
from .interventions.scale import ScalingIntervention
from .interventions.encoder import EncoderIntervention
from .interventions.CAvis import CAVisIntervention

from .pydantics.Configuration import ConfigurationModel
from .pydantics.Intervention import InterventionModel
from .pydantics.Request import RequestModel

# from pydantic import BaseModel
# import numpy as np

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

model = util.load()
model._model.pipeline.safety_checker = None

interventions_types: Dict[str, DiffusionIntervention] = {
    "Ablation": AblationIntervention,
    "Scaling": ScalingIntervention,
    "Encoder" : EncoderIntervention
}

cached_addends = None

@app.get("/init")
async def init() -> ConfigurationModel:

    return ConfigurationModel(
        interventions=[
            InterventionModel(name=name, fields=intervention.fields())
            for name, intervention in interventions_types.items()
        ],
        architecture=model,
    )


@app.post("/generate")
async def request(request: RequestModel):
    interventions = []

    for intervention_model in request.interventions:

        envoys = [
            fetch_attr(model, module_path) for module_path in intervention_model.modules
        ]

       
        intervention = interventions_types[intervention_model.name](*intervention_model.args, model, envoys)

        interventions.append(intervention)
        
        
    cross_attentions = model.unet.modules(lambda x: x._module_path.endswith("attn2"))
    cross_attentions = sorted(cross_attentions, key=lambda x: x._module_path)

    CAvis_intervention = CAVisIntervention(model, cross_attentions)
    
    interventions.append(CAvis_intervention)
        

    image: Image = util.run(
        model,
        request.prompt,
        n_steps=request.timesteps,
        seed=request.seed,
        interventions=interventions,
    )
    

    ibytes = BytesIO()

    image.save(ibytes, format="png")

    ibytes.seek(0)
    
    addends = CAvis_intervention.addends
    
    #addends = {key: value.value.cpu().tolist() for key, value in addends.items()}
    
    _addends = []
    
    for addend in addends.values():
    
        addend = addend.value.abs()
        
        addend -= addend.min()
        addend /= addend.max()
        
        _addends.append(addend.tolist())
        
    
    global cached_addends
    
    cached_addends = _addends
        
    return Response(content=ibytes.read(), media_type="image/png")

@app.get("/addends")
async def addends():
    
    global cached_addends
    
    addends = cached_addends
    
    cached_addends = None

    return JSONResponse(content=addends)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002, workers=1)
