


def isolate_attn(block, attn_idx):
    
    attention = block.attentions[attn_idx]
    
    attention.output[0][[1, 3]] = attention.proj_out.output[[0, 2]]
    
def isolate_selfattn(block, attn_idx):
    
    attention = block.attentions[attn_idx]
    
    tblock = attention.transformer_blocks[0]
    
    tblock.norm2.input[0][0][[1,3]] = tblock.attn1.output[[0,2]]
    
    attention.output[0][[1, 3]] = attention.proj_out.output[[1,3]]
    
    
def isolate_crossattn(block, attn_idx):
    
    attention = block.attentions[attn_idx]
    
    tblock = attention.transformer_blocks[0]
    
    tblock.norm3.input[0][0][[1,3]] =  tblock.attn2.output[[0,2]]
    
    attention.output[0][[1, 3]] = attention.proj_out.output[[1,3]]
    
    
def isolate_ff(block, attn_idx):
    
    attention = block.attentions[attn_idx]
    
    tblock = attention.transformer_blocks[0]
    
    tblock.output[[1,3]] = tblock.ff.output[[0,2]]
    
    attention.output[0][[1, 3]] = attention.proj_out.output[[1,3]]
    
    