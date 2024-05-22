from ..main import load
from .interventions import *
import torch

model = load()
model._model.pipeline.safety_checker = None

generator = torch.Generator()
generator = generator.manual_seed(79)
generator2 = torch.Generator()
generator2 = generator2.manual_seed(79)


with model.generate(
    "unicorn",
    output_type = "latent",
    num_images_per_prompt=2,
    generator=[generator, generator2],
    scan=False,
    validate=False,
):

    for i in range(50):

        if i != 0:
            model.unet.next(propagate=True)
        

        #skip_block(model.unet.mid_block)
        
        skip_crossattn(model.unet.up_blocks[1].attentions[1].transformer_blocks[0])

        # skip_attn(model.unet.up_blocks[-2].attentions[2])

        # skip_resnet(model.unet.up_blocks[-2].resnets[2])

            
    latents = model.output.images.save()
    
latents = latents.value
    
latents = torch.concatenate((latents, (latents[0] - latents[1]).unsqueeze(0)))


    
output = model.vae.decode(latents / model.vae.config.scaling_factor, return_dict=False, generator=[generator, generator2])[
                0
            ]

output = model.pipeline.image_processor.postprocess(output.detach().cpu(), output_type='pil')


output[0].save("control.png", format="png")
output[1].save("edited.png", format="png")
output[2].save("diff.png", format="png")

