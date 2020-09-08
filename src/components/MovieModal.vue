<template>
    <transition name="modal">
        <div v-if="open">
            <div class="overlay">
                <div class="modal">
                    <button @click="open = false">
                        <span>X</span>
                    </button>

                    <img :src="movie.poster" alt="" width="115" height="140" />

                    <p class="title">{{ movie.title }}</p>

                    <p class="extra-info">
                        {{ movie.year }} •
                        {{ movie.genres.reduce((acc, cv) => acc + "/" + cv) }}
                        • {{ Math.floor(movie.runtime / 60) }}H
                        {{ movie.runtime % 60 }}M
                    </p>

                    <div class="rating">
                        <heart-rating
                            :value="movie.rating"
                            class="heart-modal"
                        />

                        <p class="user-count">
                            ({{ movie.rating_count }} avaliações)
                        </p>
                    </div>

                    <p class="overview">{{ movie.overview }}</p>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import HeartRating from "./HeartRating";

export default {
    name: "MovieModal",

    props: ["value", "movie"],

    components: {
        HeartRating
    },

    data() {
        return {
            open: this.value
        };
    },

    watch: {
        value() {
            this.open = this.value;
        },

        open() {
            this.$emit("input", this.open);
        }
    }
};
</script>

<style scoped>
.overlay {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    display: grid;
    place-items: center;
    background-color: rgba(75, 75, 75, 0.75);
    z-index: 999;
}

.modal {
    max-width: 720px;
    height: 550px;
    position: relative;
    background-image: linear-gradient(to top, white 80%, var(--light-red) 80%);
    border-radius: 10px;
    margin: 0 15px;
    padding: 0 3.5% 3.5%;
}

button {
    width: 65px;
    height: 65px;
    position: absolute;
    top: -20px;
    right: -20px;
    color: var(--dark);
    background-color: white;
    font-size: 2rem;
    border-radius: 50%;
    transition: all 0.3s;
}

button:hover {
    transform: scale(1.15) rotate(360deg);
}

.modal-enter-active,
.modal-leave-active {
    transition: all 0.3s;
}

.modal-enter,
.modal-leave-to {
    transform: scale(0.1);
}

img {
    border-radius: 5px;
    margin: 45px auto 20px;
}

.title {
    font-size: 1.4rem;
    font-weight: 900;
    text-transform: uppercase;
    color: var(--dark);
    margin-bottom: 10px;
}

.extra-info {
    font-size: 0.85rem;
    font-weight: bold;
    text-transform: uppercase;
    color: darkgray;
}

.rating {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 20px 0 30px;
    font-size: 0.85rem;
    font-weight: bold;
    color: darkgray;
}

.heart-modal {
    margin-bottom: 15px;
}

.overview {
    height: 140px;
    font-weight: bold;
    text-align: left;
    color: rgb(90, 90, 90);
    overflow: auto;
}

@media (max-width: 800px) {
    button {
        top: -10px;
        right: -10px;
    }
}

@media (max-width: 450px) {
    .modal {
        padding: 0 20px 20px;
    }

    button {
        width: 45px;
        height: 45px;
        top: -5px;
        right: -5px;
        font-size: 1.5rem;
    }

    .overview {
        height: 120px;
    }
}
</style>

<style>
.heart-modal .heart-border {
    filter: invert(1);
}
</style>
