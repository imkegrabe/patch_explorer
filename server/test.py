import requests

intervention = {
    "name": "ablate.AblationIntervention",
    "modules": [".unet.mid_block.attentions.0.transformer_blocks.0.attn2"],
    "args" : []
}

request = {"prompt": "blue elephant", "seed": 40, "interventions": [intervention]}

response = requests.post(
    f"http://localhost:8001/generate",
    json=request,
)
from PIL import Image

zzz = Image.open(response.raw)
