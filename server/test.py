import requests

intervention = {
    "name": "Scaling",
    "selections": {0: {0 : ['0,0', '1,1'], 1: ['1,1']}},
    "args" : [.0]
}

request = {"prompt": "blue elephant", "seed": 40, "interventions": [intervention]}

response = requests.post(
    f"http://localhost:8002/generate",
    json=request,
)

from io import BytesIO

bytes = BytesIO(response.content)
from PIL import Image

zzz = Image.open(bytes)

zzz.save('test.png')
