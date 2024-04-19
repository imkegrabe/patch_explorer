from nnsight.models.DiffusionModel import DiffusionModel  
import torch
     
def encode_prompt(prompt:str, model:DiffusionModel):  
    prompt_embeds, negative_prompt_embeds = model.pipeline.encode_prompt("", torch.device("cuda"), 1, True, None) #tokens for empty prompt
    prompt_embeds = torch.cat([negative_prompt_embeds, prompt_embeds])
    
    return prompt_embeds
