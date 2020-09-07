<template>
    <div class="container">
        <div>
            <h1>A pagina que você digitou não existe</h1>
            <router-link to="/">
                <button>
                    Voltar para a página inicial
                </button>
            </router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: "Page404"
};
</script>

<style scoped>
.container {
    display: grid;
    place-items: center;
}

button {
    font-size: 1.1rem;
    color: var(--red);
    background-color: white;
    border: 1px solid var(--red);
    border-radius: 10px;
    padding: 15px;
    margin: 50px 10px 0;
}

button:hover {
    color: white;
    background-color: var(--red);
}
</style>
