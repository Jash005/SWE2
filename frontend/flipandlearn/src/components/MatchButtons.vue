<template>
  <div class="match-buttons">
    <button @click="$emit('decision', true)">
      <span class="material-symbols-outlined">check</span>
      Passt
    </button>
    <button @click="$emit('decision', false)">
      <span class="material-symbols-outlined">close</span>
      Passt nicht
    </button>
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
.match-buttons button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 22px;
    font-weight: 7000;
  }

button {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border: 2px solid transparent;
  border-radius: 5px;
  cursor: pointer;
  background-color: var(--button);
  color: var(--button-font);
  animation: pulse 1.5s infinite; /* Pulsierende Animation */
}

@keyframes pulse {
  0% {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-color: transparent;
  }
  50% {
    box-shadow: 0 0 35px rgba(0, 0, 0, 0.85);
    border-color: var(--button-hover);
  }
  100% {
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    border-color: transparent;
  }
}

button:hover {
  background-color: var(--button-hover);
}

@media screen and (min-width: 768px) {
    .match-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

}
</style>