from .main import load, run
from .interventions.ablate import AblationIntervention
from .util import encode_prompt
import torch

model = load()
model._model.pipeline.safety_checker = None

def skip_ablate(module):
    
    module.output[:] = 0

def skip_attn(attention):
    
    attention.output[0][[1,3]] = attention.input[0][0][[1,3]]
    
def skip_resnet(resnet):
    
    resnet.output[[1,3]] = resnet.conv_shortcut.output[[1,3]] if resnet.conv_shortcut is not None else resnet.input[0][0][[1,3]]

def skip_block(block):
    
    # if 'up' in block._module_path:

    #     for i, resnet in enumerate(block.resnets):
                
    #         block.input[1]["res_hidden_states_tuple"][i][[1,3]] = block.input[1]["res_hidden_states_tuple"][i][[0,2]]            
                
    if hasattr(block, 'attentions'):
                    
        for attn in block.attentions:
            skip_attn(attn)
            
            
    for resnet in block.resnets:
        skip_resnet(resnet)
        
        
def isolate_attn(block, attn_idx):
    
    block.attentions[attn_idx].output[0][[1, 3]] = block.attentions[attn_idx].proj_out.output[[0, 2]]
    
    # block.attentions[attn_idx].proj_out.output[[1, 3]] = 0 * block.attentions[attn_idx].proj_out.output[[0, 2]]
    
    # resnet = block.resnets[attn_idx].conv_shortcut.output if block.resnets[attn_idx].conv_shortcut is not None else block.resnets[attn_idx].output
    
    # resnet[[1,3]] = 0 * resnet[[0,2]]
    
    # for resnet in block.resnets[attn_idx + 1:]:
        
    #     resnet.output[[1,3]] = resnet.conv_shortcut.output[[1,3]] if resnet.conv_shortcut is not None else resnet.input[0][0][[1,3]]
           
    # for attn in block.attentions[attn_idx + 1:]:
        
    #     attn.output[0][[1,3]] = attn.input[0][0][[1,3]]
        
generator = torch.Generator()
generator = generator.manual_seed(79)
generator2 = torch.Generator()
generator2 = generator2.manual_seed(79)


blocks = [*model.unet.down_blocks, model.unet.mid_block, *model.unet.up_blocks]
block_idx = {blocks[i]._module_path: i for i in range(len(blocks))}

block = model.unet.mid_block
attn_idx = 0

with model.generate(
    "blue elephant",
    output_type = "latent",
    num_images_per_prompt=2,
    generator=[generator, generator2],
    scan=False,
    validate=False,
):

    for i in range(50):

        if i != 0:
            model.unet.next(propagate=True)
        
        # skip_block(model.unet.up_blocks[3])
        # skip_block(model.unet.up_blocks[2])
        # skip_block(model.unet.up_blocks[0])
        # skip_block(model.unet.up_blocks[1])
        skip_block(model.unet.mid_block)
        # skip_block(model.unet.down_blocks[1])
        # skip_block(model.unet.down_blocks[2])
        # skip_block(model.unet.down_blocks[0])
        # skip_attn(model.unet.up_blocks[-2].attentions[2])
        # skip_attn(model.unet.up_blocks[-2].attentions[1])
        # skip_attn(model.unet.up_blocks[-2].attentions[0])
        # skip_resnet(model.unet.up_blocks[-2].resnets[2])
        # skip_resnet(model.unet.up_blocks[-2].resnets[1])
        # skip_resnet(model.unet.up_blocks[-2].resnets[0])
        # skip_block(model.unet.down_blocks[2])
        # skip_block(model.unet.up_blocks[0])

        # #isolate_attn(block, attn_idx)
        
        # for skipblock in blocks[block_idx[block._module_path] + 1:]:
        #     skip_block(skipblock)
            
            
    latents = model.output.images.save()
    
# latents[1] = latents[0] - latents[1]

output = model.vae.decode(latents / model.vae.config.scaling_factor, return_dict=False, generator=[generator, generator2])[
                0
            ]

output = model.pipeline.image_processor.postprocess(output.detach().cpu(), output_type='pil')


output[0].save("control.png", format="png")
output[1].save("edited.png", format="png")
