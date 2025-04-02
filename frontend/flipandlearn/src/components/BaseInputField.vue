<template>
  <div class="input-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <input :id="id" :type="type" :placeholder="placeholder" v-model="inputValue"
      :class="{ 'input-error': errorMessage }" @input="updateValue" />
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInputField',
  props: {
    modelValue: String, // v-model für Zwei-Wege-Datenbindung
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    id: String,
    validation: Function, // Optional: Validierungsfunktion
  },
  data() {
    return {
      errorMessage: "",
    };
  },
  computed: {
    inputValue: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit("update:modelValue", value);
      },
    },
  },
  methods: {
    updateValue(event) {
      const value = event.target.value;
      this.$emit("update:modelValue", value);

      if (this.validation) {
        this.errorMessage = this.validation(value);
      }
    },
  },
}
</script>

<style scoped>
.input-group {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

label {
  color: var(--white-font);
  font-size: 14px;
  margin-bottom: 6px;
  display: block;
  text-align: left;
  opacity: 0.5;
}

input {
  padding: 10px;
  background-color: var(--color-input-bg);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  color: var(--white-font);
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input:focus {
  border-color: var(--bright-font);
  background-color: #1a1a1a;
  outline: none;
}

.input-error {
  border-color: red;
}

.error {
  color: red;
  font-size: 12px;
}
</style>