from nnsight.models.DiffusionModel import DiffusionModel

from typing import List
import torch

from .interventions import DiffusionIntervention

def load(id: str = "CompVis/stable-diffusion-v1-4"):
    
    return DiffusionModel(id, dispatch=True).to('cuda:0')


def run(model:DiffusionModel, prompt:str, n_steps:int = 50, seed:int=40, interventions: List[DiffusionIntervention] = []):
    
    generator = torch.Generator()
    generator = generator.manual_seed(seed)
    
    with model.generate(prompt, num_inference_steps=n_steps, generator=generator, validate=False, scan=False):
        
        for intervention in interventions:
            intervention()
            
        output = model.output.save()
        
    return output.images[0]


def encode_prompt(prompt:str, model:DiffusionModel):  
    prompt_embeds, negative_prompt_embeds = model.pipeline.encode_prompt(prompt, torch.device("cuda"), 1, True, None) #tokens for empty prompt
    prompt_embeds = torch.cat([negative_prompt_embeds, prompt_embeds])
    
    return prompt_embeds
