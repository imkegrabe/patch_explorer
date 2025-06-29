import base64
import importlib
import json
from io import BytesIO
from typing import Dict, List

import torch
import uvicorn
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from PIL.Image import Image

from nnsight.util import fetch_attr

from . import util
from .interventions import DiffusionIntervention
from .interventions.CAvis import CAVisIntervention
from .interventions.encoder import EncoderIntervention
from .interventions.scale import ScalingIntervention
from .schema.Configuration import ConfigurationModel
from .schema.Intervention import InterventionModel
from .schema.Request import RequestModel

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

cross_attentions = model.unet.modules(lambda x: x.path.endswith("attn2"))
cross_attentions = sorted(cross_attentions, key=lambda x: x.path)

interventions_types: Dict[str, DiffusionIntervention] = {
    "Scaling": ScalingIntervention,
    "Encoder": EncoderIntervention,
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

        if len(intervention_model.selections) < 2:
            break
        
        envoys = []
        selections = {}
        
        for module_idx in range(len(intervention_model.selections)):
            envoy = cross_attentions[module_idx]
            envoys.append(envoy)
            selections[envoy.path] = intervention_model.selections[module_idx]
            
        intervention = interventions_types[intervention_model.name](
            *intervention_model.args,
            model,
            envoys,
            selections=selections,
            start_step=intervention_model.start_step,
            end_step=intervention_model.end_step
        )
        
        print(intervention.start_step, intervention.end_step    )

        interventions.append(intervention)

    CAvis_intervention = CAVisIntervention(model, cross_attentions)

    interventions.append(CAvis_intervention)

    image: Image = util.run(
        model,
        request.prompt,
        n_steps=request.timesteps,
        seed=request.seed,
        interventions=interventions
        # start_step=
        # end_step=
    )

    ibytes = BytesIO()

    image.save(ibytes, format="png")

    ibytes.seek(0)

    addends = CAvis_intervention.addends

    # addends = {key: value.value.cpu().tolist() for key, value in addends.items()}

    _addends = []

    # addends for every layer
    for key, addend in addends.items():
        addend = torch.stack(addend)
        # print (addend.shape)
        # addend = sum(addend)#.abs()
        
        # # # print("min addend", addend.min())
        # # # addend -= addend.min()

        # # print("abs max addend", addend.abs().max())
        addend /= addend.abs().max()
        # print("min, max addend after div", addend.max(), addend.min())
        # print(len(addend))
        
        _addends.append(addend)

    global cached_addends

    cached_addends = _addends

    return Response(content=ibytes.read(), media_type="image/png")


@app.get("/addends")
async def addends(show_timesteps: bool = False):
    global cached_addends

    addends = cached_addends
    cached_addends = None

    # First multiply by 255 and convert to int8
    data = [tensor.mul(255).to(torch.int8) for tensor in addends]
    
    print(show_timesteps)
    print(data[0].shape)

    if not show_timesteps:
        # Average across timesteps dimension while keeping the dimension
        data = [tensor.float().mean(dim=0, keepdim=True).to(torch.int8) for tensor in data]

    # Convert to list
    data = [tensor.tolist() for tensor in data]

    return JSONResponse(content=data)


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8004, workers=1)
