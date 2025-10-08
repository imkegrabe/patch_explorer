<script>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';

export default {
  name: "InterventionDisplay",
  components: {
    Button,
    InputText,
    Dropdown,
  },

  props: {
    encoderValue: String,
    interventionType: String,
  },

  data() {
    return {
      sidebar_visible: true,
      selectedIntervention: { name: 'SCALING', code: 'Scaling' },
      interventions: [
        { name: 'ENCODING', code: 'Encoding' },
        { name: 'SCALING', code: 'Scaling' },
      ],
    };
  },

  computed: {
  inputPlaceholder() {
    if (!this.selectedIntervention) return '';
    return this.selectedIntervention.code === 'Encoding'
      ? 'alternative prompt'
      : 'factor';
  },
  inputType() {
    return this.selectedIntervention?.code === 'Scaling' ? 'number' : 'text';
  },
  noteMessage() {
  if (!this.selectedIntervention) return '';
  
  if (this.selectedIntervention.code === 'Scaling') {
    if (!this.encoderValue || this.encoderValue.trim() === '')
      return 'enter scaling factor!';
  }

  if (this.selectedIntervention.code === 'Encoding') {
    return '[can be empty]';
  }

  return '';
  },

},

  mounted() {
    // ✅ Ensure parent gets default immediately
    this.$emit('update:interventionType', this.selectedIntervention.code);
  },

  methods: {
  toggle() {
    this.sidebar_visible = !this.sidebar_visible;
  },

  onInterventionChange() {
    this.$emit('update:interventionType', this.selectedIntervention.code);
    this.$emit('update:encoderValue', '');
  },

  onInputChange(event) {
    // always emit value (numbers stay as strings for consistency)
    this.$emit('update:encoderValue', event.target.value);
  },

  filterNumberInput(event) {
    if (this.selectedIntervention?.code === 'Scaling') {
      const allowed = /[0-9.-]/
      if (!allowed.test(event.key)) {
        event.preventDefault();
      }
    }
  }
},

};
</script>

<template>
  <div class="intervention-container" v-if="sidebar_visible">
    <p style="top: 5px; bottom: 10px; font-size: 1rem;"><b>Interventions:</b></p>
    <div class="intervention-group">
      <Dropdown
        v-model="selectedIntervention"
        :options="interventions"
        optionLabel="name"
        placeholder="Intervention"
        class="intervention-dropdown"
        @change="onInterventionChange"
      />

      <InputText
        :type="inputType"
        class="intervention-input"
        :placeholder="inputPlaceholder"
        :value="encoderValue"
        @input="onInputChange($event)"
        @keypress="filterNumberInput($event)"
      />

      <p v-if="noteMessage" class="input-note">{{ noteMessage }}</p>


    </div>
  </div>
</template>

<style>
.intervention-container {
  position: fixed;
  left: 15px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.15);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px 4px rgba(0, 255, 0, 0.5);
  border-radius: 8px;
  padding: 8px 8px;
  z-index: 1000;
  color: rgb(0, 255, 0);
}

.intervention-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

.intervention-dropdown {
  width: 200px;
  background-color: black !important;
  color: rgb(0, 255, 0) !important;
  border: 1px solid rgb(0, 255, 0) !important;
  border-radius: 6px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 1rem;
}

.intervention-dropdown .p-dropdown-label {
  color: rgb(0, 255, 0) !important;
  background-color: black !important;
  padding: 1px;
}

.intervention-dropdown .p-dropdown-item {
  color: rgb(0, 255, 0) !important;
  background-color: black !important;
  padding: 1px;
}

.intervention-input {
  width: 200px;
  background-color: rgba(0, 0, 0, 0.85) !important;
  color: rgb(0, 255, 0) !important;
  border: 1px solid rgb(0, 255, 0);
  border-radius: 6px;
  font-family: monospace;
}

.intervention-input:focus,
.intervention-dropdown:focus-within {
  box-shadow: 0 0 8px rgba(0, 255, 0, 0.8);
  outline: none;
}

.intervention-container:hover {
  box-shadow: 0 0 12px 6px rgba(0, 255, 0, 0.7);
}

.p-dropdown-panel {
  background: black !important;
  color: rgb(0,255,0) !important;
}

/* @keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
} */

.input-note {
  color: rgb(0, 255, 0);
  font-size: 0.8rem;
  margin-top: -8px;
  text-shadow: 0 0 8px rgba(255, 200, 0, 0.8);
  font-family: monospace;
  animation: blink 1.4s ease-in-out infinite;
}

/* @keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
} */

/* --- Safari & global dropdown fix --- */
:root,
body,
.p-component,
.p-dropdown,
.p-dropdown-panel,
.p-dropdown-items,
.p-dropdown-item,
.p-dropdown-label,
.p-dropdown-trigger {
  background-color: black !important;
  color: rgb(0, 255, 0) !important;
}

/* Force dropdown panel globally (Safari sometimes moves it out of scope) */
body > .p-dropdown-panel {
  background-color: black !important;
  border: 1px solid rgb(0, 255, 0) !important;
  color: rgb(0, 255, 0) !important;
}

body > .p-dropdown-panel .p-dropdown-item {
  background-color: black !important;
  color: rgb(0, 255, 0) !important;
}

body > .p-dropdown-panel .p-dropdown-item.p-highlight,
body > .p-dropdown-panel .p-dropdown-item:hover {
  background-color: rgb(0, 255, 0) !important;
  color: black !important;
}

/* Make sure the caret (arrow) is visible */
.p-dropdown-trigger-icon {
  color: rgb(0, 255, 0) !important;
}

/* Selected dropdown item / label */
.p-dropdown-label {
  color: rgb(0, 255, 0) !important; /* neon green */
  background-color: black !important; /* keep black background */
  font-weight: bold;
}

/* Make sure the overlay panel shows the selected item clearly */
.p-dropdown-panel .p-dropdown-item.p-highlight {
  background-color: rgb(0, 255, 0) !important; /* green highlight */
  color: black !important; /* text in highlight should be readable */
}

/* Optional: add subtle glow for selected item */
.p-dropdown-panel .p-dropdown-item.p-highlight {
  box-shadow: 0 0 6px rgba(0, 255, 0, 0.7);
}

</style>
