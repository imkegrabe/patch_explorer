from ..main import load
from .interventions import *
from .isolation import *
import torch

model = load()
model._model.pipeline.safety_checker = None

def restore(block, attn_idx):
    
    module = block.attentions[attn_idx].transformer_blocks[0].attn2
    
    module.output[[1,3]] = module.output[[0,2]]
    
attn2s = model.unet.modules(lambda x : x._module_path.endswith('attn2'))


for i, module in enumerate(attn2s):
    

    
    generator = torch.Generator()
    generator = generator.manual_seed(2)
    generator2 = torch.Generator()
    generator2 = generator2.manual_seed(2)



    with model.generate(
        [["unicorn", ""]],
        output_type = "latent",
        generator=[generator, generator2],
        scan=False,
        validate=False,
    ):

        for i in range(50):

            if i != 0:
                model.unet.next(propagate=True)
                    
            module.output[[1,3]] = 3 * module.output[[0,2]]
                    
        latents = model.output.images.save()
        
    latents = latents.value

    latents = torch.concatenate((latents, (latents[1] - latents[0]).unsqueeze(0)))


        
    output = model.vae.decode(latents / model.vae.config.scaling_factor, return_dict=False, generator=[generator, generator2])[
                    0
                ]

    output = model.pipeline.image_processor.postprocess(output.detach().cpu(), output_type='pil')


    output[0].save("control.png", format="png")
    output[1].save(f"edited_{module._module_path}.png", format="png")
    output[2].save("diff.png", format="png")

