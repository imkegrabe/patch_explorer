from .main import load, run
from .interventions.ablate import AblateIntervention

model = load()


image = run(model, "blue elephant")

image.save('control.png')

image = run(model, "blue elephant")

image.save('control2.png')

envoys = model.modules(lambda envoy : envoy._module_path.endswith('attn1') or envoy._module_path.endswith('attn2'))

int1 = AblateIntervention(envoys[0:3])

increase_module = model.modules(lambda envoy : envoy._module_path == 'module_we_care_about')
all_others = model.modules(lambda envoy : envoy._module_path != 'module_we_care_about')


increase_intevention = IncreaseIntevnetion(2, increase_module)
decrease_intevention = DecreaseIntevnetion(.1, all_others)


image = run(model, "blue elephant", interventions=[increase_intevention, decrease_intevention])

image.save('int1.png')
