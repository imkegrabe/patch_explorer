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
      selectedIntervention: null,
      interventions: [
        { name: 'Encoding', code: 'Encoding' },
        { name: 'Scaling', code: 'Scaling' },
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
  },

  methods: {
    toggle() {
      this.sidebar_visible = !this.sidebar_visible;
    },

    showDropdownMessage() {
      const splitMsg = document.getElementById('split-image-message');
      if (splitMsg) splitMsg.remove();

      const existing = document.getElementById('dropdown-message');
      if (!existing) {
        const div = document.createElement('div');
        div.id = 'dropdown-message';
        div.innerHTML =
          'Click on a patch grid to target the intervention.<br>Then generate again.';
        div.style.position = 'fixed';
        div.style.bottom = '10px';
        div.style.left = '10px';
        div.style.background = 'rgba(0, 0, 0, 0)';
        div.style.color = 'rgb(0,255,0)';
        div.style.padding = '6px 10px';
        div.style.fontFamily = 'Courier, monospace';
        div.style.fontSize = '14px';
        div.style.borderRadius = '4px';
        div.style.zIndex = '9999';

        document.body.appendChild(div);

        setTimeout(() => {
          const el = document.getElementById('dropdown-message');
          if (el) el.remove();
        }, 7000);
      }
    },

    onInterventionChange() {
      this.$emit('update:interventionType', this.selectedIntervention.code);
      this.$emit('update:encoderValue', '');
      this.showDropdownMessage();
    },
  },
};
</script>

<template>
  <div class="intervention-container" v-if="sidebar_visible">
    <p style="top: 5px; bottom: 10px;"> <b>Interventions:</b></p>
    <div class="intervention-group">
      <Dropdown
        v-model="selectedIntervention"
        :options="interventions"
        optionLabel="name"
        placeholder="Intervention"
        class="intervention-dropdown"
      />

      <InputText
        type="text"
        class="intervention-input"
        :placeholder="inputPlaceholder"
        :value="encoderValue"
        @input="$emit('update:encoderValue', $event.target.value)"
      />
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
  /* width: 240px; */
  color: rgb(0, 255, 0);
}

.intervention-group {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
}

/* Dropdown styling (same glow and text color) */
.intervention-dropdown {
  width: 200px;
  background-color: black !important;
  color: rgb(0, 255, 0) !important;
  border: 1px solid rgb(0, 255, 0) !important;
  border-radius: 6px;
  font-family: monospace;
  font-size: 1rem;
  top: 15px;
}

.intervention-dropdown .p-dropdown-label {
  color: rgb(0, 255, 0) !important;
  padding: 1px;
}

.intervention-dropdown .p-dropdown-item {
  color: rgb(0, 255, 0) !important;
  background-color: black !important;
  padding: 1px;
}

/* Input styling */
.intervention-input {
  width: 200px;
  background-color: rgba(0, 0, 0, 0.85) !important;
  color: rgb(0, 255, 0) !important;
  border: 1px solid rgb(0, 255, 0);
  border-radius: 6px;
  font-family: monospace;
}

/* Optional hover/focus effects */
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

</style>
