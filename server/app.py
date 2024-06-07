import importlib
from io import BytesIO
from typing import Dict, List

import uvicorn
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from PIL.Image import Image

from nnsight.util import fetch_attr

from . import util
from .interventions import DiffusionIntervention
from .interventions.ablate import AblationIntervention
from .interventions.scale import ScalingIntervention
from .interventions.encoder import EncoderIntervention
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

       
        print(intervention_model.args)
        intervention = interventions_types[intervention_model.name](*intervention_model.args, model, envoys)

        interventions.append(intervention)

    image: Image = util.run(
        model,
        request.prompt,
        n_steps=request.timesteps,
        seed=request.seed,
        interventions=interventions,
    )

    bytes = BytesIO()

    image.save(bytes, format="png")

    bytes.seek(0)

    return Response(content=bytes.read(), media_type="image/png")


if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8002, workers=1)
