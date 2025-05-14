<template>
  <div class="input-group">
    <label v-if="label" :for="id">{{ label }}</label>
    <input :id="id" :type="type" :placeholder="placeholder" v-model="inputValue"
      :class="{ 'input-error': errorMessage }" @input="updateValue" lazy />
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  name: 'BaseInputField',
  props: {
    modelValue: String,
    label: String,
    placeholder: String,
    type: {
      type: String,
      default: "text",
    },
    id: String,
    validation: Function,
  },
  data() {
    return {
      errorMessage: "",
      debounceTimeout: null,
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

      clearTimeout(this.debounceTimeout)
      this.debounceTimeout = setTimeout(() => {
        if (this.validation) {
          this.errorMessage = this.validation(value) || '';
        } else {
          this.errorMessage = '';
        }
      }, 1000)
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
  margin-bottom: 6px;
  display: block;
  opacity: 0.5;
  text-align: left;
  color: var(--label-font);
  font-size: 14px;
}

input {
  padding: 12px;
  border: 1px solid var(--input-field-border);
  border-radius: 10px;
  font-size: 15px;
  color: var(--black-font);
  background-color: var(--input-field);
  transition: border-color 0.3s ease, background-color 0.3s ease;
}

input:focus {
  background-color: var(--input-field-focus);
  color: var(--black-font);
  border-color: var(--general-font);
  outline: none;
}

input:-webkit-autofill,
input:-webkit-autofill:focus {
  -webkit-box-shadow: 0 0 0 1000px var(--input-field) inset;
  -webkit-text-fill-color: var(--black-font);
  transition: background-color 5000s ease-in-out 0s;
}

.input-error {
  border-color: red;
}

.error-message {
  padding: 10px;
  min-height: 1.2em;
  text-align: left;
  max-width: 500px;
  margin: auto;
  color: red;
  background: #ffe0e0;
}
</style>