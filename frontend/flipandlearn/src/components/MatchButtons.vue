<template>
  <div class="match-buttons">
    <button @click="$emit('decision', true)">Passt</button>
    <button @click="$emit('decision', false)">Passt nicht</button>
  </div>
</template>

<script>
export default {
  name: 'MatchButtons'
};
</script>

<style scoped>
.match-buttons {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--button);
  color: var(--button-font);
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: var(--button-hover);
}
</style>