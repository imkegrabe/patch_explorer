from typing import List

from nnsight.envoy import Envoy

from ..pydantics.Intervention import FieldModel
from ..util import encode_prompt
from . import DiffusionIntervention


class EncoderIntervention(DiffusionIntervention):

    def __init__(self, replacement_text, *args, **kwargs) -> None:
        super().__init__(*args, **kwargs)

        self.replacement = encode_prompt(replacement_text, self.model)

    def intervene(self, envoy: Envoy):
        envoy.input[1]["encoder_hidden_states"] = self.replacement

    @classmethod
    def fields(cls):

        return [FieldModel(name="Text", type=FieldModel.FieldType.string)]
