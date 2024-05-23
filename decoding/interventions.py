
from .. import util

encoding = None

def skip_ablate(module):
    
    module.output[[1,3]] = 0
    
def skip_crossattn(tblock, encoder_model=None):
    
    global encoding
    
    if encoder_model is None:
    
        skip_ablate(tblock.attn2)
        
    else:
        
        if encoding is None:
        
            encoding = util.encode_prompt("", encoder_model)
        
        tblock.attn2.input[1]["encoder_hidden_states"] = encoding
    
def skip_crossattns(block, encoder_model=None):
    
    for attn in block.attentions:
            
        tblock = attn.transformer_blocks[0]
        
        skip_crossattn(tblock, encoder_model=encoder_model)
    
        
def skip_selfattn(attention):
    
    skip_ablate(attention.attn1)
    
def skip_ff(attention):
    
    skip_ablate(attention.ff)

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
        