from .main import load, run
from .interventions.ablate import AblationIntervention
from .interventions.encoder import EncoderIntervention
from .util import encode_prompt

model = load()

image = run(model, "blue elephant")

image.save('control.png')

image = run(model, "blue elephant")

image.save('control2.png')

envoys = model.modules(lambda envoy : envoy._module_path.endswith('attn2') and 'mid' not in envoy._module_path)

int1 = AblationIntervention(envoys)


image = run(model, "blue elephant", interventions=[int1])

image.save('int1.png')


blank_embeds = encode_prompt("", model)


int2 = EncoderIntervention(blank_embeds, envoys)

image = run(model, "blue elephant", interventions=[int2])

image.save('int2.png')


image = run(model, "", interventions=[int2])

image.save('blank.png')



