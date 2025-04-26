<template>
    <div class="content">
        <h1>Du hast es{{ moves ? ' mit ' + moves + ' Versuchen ' : '' }} geschafft!</h1>

        <h2 v-if=scores>Dein Punktestand: {{ scores }}</h2>
    
        <p>Glückwunsch!</p>
        <div class="button-wrapper">
            <router-link to="/" class="yellow-btn">
                Startseite
                <span class="material-symbols-outlined">home</span>
            </router-link>

            <router-link :to="gamePath" class="yellow-btn">
                Nochmal
                <span class="material-symbols-outlined">replay</span>
            </router-link>
        </div>
    </div>    
</template>

<script>
    export default {
    name: 'GameResult',
    data() {
        return {
            gamePath: this.$route.query.setId ? "/game/setId=" + this.$route.query.setId : "/game",
            scores: this.$route.query.score || null,
            moves: this.$route.query.moves || null,
        };
    },
    };
</script>

<style scoped>
    h1 {
        color: var(--general-font-header);
        text-shadow: var(--font-header-shadow);
        margin-bottom: 20px;
    }
    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start; 
        padding: 2rem 1rem;
        min-height: 100vh;
        text-align: center;
    }

    /* For screens bigger than mobile */
    @media (min-width: 600px) {
        .content {
            justify-content: center; 
            padding: 0 2rem;
        }
    }
    .button-wrapper {
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        align-content: center;
        gap: 15px;
        justify-content: center;
        align-items: center;
    }
    .yellow-btn {
        background-color: var(--button);
        color: var(--black-font);
        padding: 12px 24px;
        border-radius: 10px;
        text-decoration: none;
        font-size: 18px;
        font-weight: 500;
        transition: background-color 0.3s ease, transform 0.2s ease;
        box-shadow: var(--button-shadow);
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        align-items: flex-end;
        justify-content: center;
    }
    .yellow-btn:hover {
        background-color: var(--button-hover);
        transform: translateY(-2px);
    }
</style>