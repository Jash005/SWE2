<template>
    <div class="card-container">
        <div class="card">{{ card.question }}</div>
        <div class="card">{{ card.answer }}</div>
    </div>
</template>

<script>

export default {
    name: 'CardPair',
    components: {
    },
    props: {
        card: {
            type: Object,
            required: true
        }
    },
    data() {
        return {
            
        };
    },
};
</script>

<style scoped>
.card-container {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    margin-top: 20px;
}
.card {
    flex: 1 1 40%;
    min-height: 100px;
    padding: 1rem;
    outline: 5px solid var(--general-font-header);
    outline-offset: -10px;
    background-color: var(--general-font-hover);
    color: var(--black-font);
    font-weight: 500;
    transition: box-shadow 0.2s ease;
    border: 1px solid var(--button);
}

</style>


