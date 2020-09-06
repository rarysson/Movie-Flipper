<template>
    <div class="container">
        <routes-header />

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
import RoutesHeader from "@/components/RoutesHeader";

export default {
    name: "HomePage",

    components: {
        RoutesHeader
    }
};
</script>

<style scoped>
.container {
    background: var(--red-gradient);
}

.card {
    max-width: 700px;
    height: 460px;
    background-color: white;
    margin: 3.5vw auto;
    border-radius: 5px;
}

.actions {
    display: inline-flex;
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
