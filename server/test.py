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

from io import BytesIO

bytes = BytesIO(response.content)
from PIL import Image

zzz = Image.open(bytes)

zzz.save('test.png')
