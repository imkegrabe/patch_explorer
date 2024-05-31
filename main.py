from nnsight.models.DiffusionModel import DiffusionModel
from diffusers.schedulers.scheduling_ddim import DDIMScheduler
from typing import List
import torch

from interventions import DiffusionIntervention
def load(id: str = "CompVis/stable-diffusion-v1-4"):
    
    model = DiffusionModel(id, dispatch=True).to('cuda:0')
    
    model._model.pipeline.scheduler = DDIMScheduler.from_config(model._model.pipeline.scheduler.config)
    
    return model



def run(model:DiffusionModel, prompt:str, n_steps:int = 50, seed:int=40, interventions: List[DiffusionIntervention] = []):
    
    generator = torch.Generator()
    generator = generator.manual_seed(seed)
    
    with model.generate(prompt, num_inference_steps=n_steps, generator=generator, validate=False, scan=False):
        
        for intervention in interventions:
            intervention()
            
        output = model.output.save()
        
    return output.images[0]