<template>
    <div class="container">
        <img src="../assets/logo-viva-decora.png" alt="vica decora logo" />

        <nav class="routes">
            <router-link to="/" class="r-btn">
                <button>Filmes não curados</button>
            </router-link>
            <router-link to="/likes" class="r-btn">
                <button>Filmes curtidos</button>
            </router-link>
            <router-link to="/dislikes" class="r-btn">
                <button>Filmes não curtidos</button>
            </router-link>
        </nav>

        <div class="card"></div>

        <div class="actions">
            <button>
                <img src="../assets/n-curti.png" alt="" />
                <span>Não curti!</span>
            </button>

            <button>Pular</button>

            <button>
                <img src="../assets/curti.png" alt="" />
                <span>Curti!</span>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    name: "HomePage"
};
</script>

<style scoped>
.container {
    width: 100%;
    height: 100%;
    background: linear-gradient(to right, var(--light-red), var(--red));
    text-align: center;
    padding: 2vw 0;
}

button {
    text-transform: uppercase;
    border: none;
}

.routes {
    margin: 2vw 0 4vw;
}

.routes button {
    position: relative;
    color: white;
    background-color: transparent;
    font-weight: 600;
    opacity: 0.65;
}

.routes button::before {
    content: "";
    position: absolute;
    bottom: -7px;
    left: 0;
    width: 0;
    height: 5px;
    background-color: white;
    transition: 0.3s;
}

.routes button:hover {
    opacity: 1;
}

.routes button:hover::before {
    width: 100%;
}

.routes .r-btn:nth-of-type(2) {
    margin: 0 75px;
}

.card {
    max-width: 700px;
    height: 460px;
    background-color: #fff;
    margin: 3.5vw auto;
    border-radius: 5px;
}

.actions {
    display: inline-flex;
}

.actions button {
    height: 75px;
    padding: 0 30px;
    color: rgb(70, 70, 70);
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
</style>
