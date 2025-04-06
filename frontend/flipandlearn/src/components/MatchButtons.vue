<template>
    <div class="match-buttons">
        <button @click="$emit('check-match', true)" class="btn-match">
            <span class="material-symbols-outlined">check</span>
            Passt
        </button>
        <button @click="$emit('check-match', false)" class="btn-no-match">
            <span class="material-symbols-outlined">close</span>
            Passt nicht
        </button>
    </div>
</template>

<script>
export default {
    name: "MatchButtons",
};
</script>

<style scoped>
.match-buttons {
    display: grid;
    gap: 20px;
    margin-bottom: 20px;
}

.match-buttons button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    font-size: 22px;
}

.btn-match,
.btn-no-match {
    padding: 10px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.btn-match {
    background-color: #4caf50;
    color: white;
}

.btn-match:hover {
    background-color: #45a049;
}

.btn-no-match {
    background-color: #f44336;
    color: white;
}

.btn-no-match:hover {
    background-color: #e53935;
}

@media screen and (min-width: 768px) {
    .match-buttons {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

}
</style>