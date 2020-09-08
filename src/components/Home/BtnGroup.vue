<template>
    <div class="actions">
        <button @click="$emit('dislike')">
            <img src="@/assets/n-curti.png" alt="" />
            <span>Não curti!</span>
        </button>

        <button @click="$emit('skip')">Pular</button>

        <button @click="$emit('like')">
            <img src="@/assets/curti.png" alt="" />
            <span>Curti!</span>
        </button>
    </div>
</template>

<script>
export default {
    name: "BtnGroup"
};
</script>

<style scoped>
.actions {
    display: inline-flex;
    align-items: center;
}

.actions button {
    height: 75px;
    padding: 0 30px;
    color: var(--dark);
    background-color: white;
    border-radius: 50px;
    font-size: 0.97rem;
    font-weight: bold;
    transition: 0.25s;
}

.actions button:hover {
    transform: scale(1.1);
}

.actions button:nth-of-type(odd) {
    width: 230px;
    font-size: 1.2rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
}

.actions img {
    width: 40px;
    height: 40px;
    margin-right: 10px;
    margin-top: 12px;
}

.actions button:last-of-type img {
    align-self: flex-start;
}

.actions button:nth-of-type(2) {
    margin: 0 40px;
}

.actions button:last-of-type {
    color: var(--light-red);
}

@media (max-width: 700px) {
    .actions button:nth-of-type(odd) {
        width: auto;
    }
}

@media (max-width: 600px) {
    .actions button {
        padding: 0;
    }

    .actions img {
        margin: 0;
    }

    span {
        display: none;
    }

    .actions button:nth-of-type(odd) {
        width: 75px;
        display: unset;
        border-radius: 50%;
    }

    .actions button:nth-of-type(2) {
        height: 60px;
        margin: 0 20px;
        padding: 0 20px;
    }
}
</style>
