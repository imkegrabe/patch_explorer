import importlib
from io import BytesIO

import uvicorn
from fastapi import FastAPI, Response
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image as MImage
from PIL.Image import Image

from nnsight.util import fetch_attr

from . import util
from .Request import RequestModel

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


model = util.load()


@app.post("/generate")
async def request(request: RequestModel):
    interventions = []

    for intervention_model in request.interventions:

        envoys = [
            fetch_attr(model, module_path) for module_path in intervention_model.modules
        ]

        intervention_atoms = intervention_model.name.split(".")

        intervention_module = importlib.import_module(
            f".{'.'.join(intervention_atoms[:-1])}", package="interventions"
        )

        intervention_type = getattr(intervention_module, intervention_atoms[-1])

        intervention = intervention_type(envoys, *intervention_model.args)

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
    uvicorn.run(app, host="0.0.0.0", port=8001, workers=1)
