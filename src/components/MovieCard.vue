<template>
    <div class="card" ref="card">
        <div v-if="movie" class="card-content">
            <div class="info-container">
                <p class="title">{{ movie.title }}</p>

                <div class="rating">
                    <heart-rating :value="movie.rating" />

                    <p class="user-count">
                        ({{ movie.rating_count }} avaliações)
                    </p>
                </div>
            </div>

            <p class="extra-info">
                {{ movie.year }} •
                {{ movie.genres.reduce((acc, cv) => acc + "/" + cv) }}
                • {{ Math.floor(movie.runtime / 60) }}H
                {{ movie.runtime % 60 }}M
            </p>

            <div class="overview-container">
                <p>{{ movie.overview }}</p>

                <button @click="open_modal = true">Ver Sinopse</button>
            </div>
        </div>

        <div v-else class="card-content">
            <p class="title">Nenhum filme a ser mostrado</p>
        </div>

        <movie-modal v-model="open_modal" :movie="movie" />
    </div>
</template>

<script>
import HeartRating from "./HeartRating";
import MovieModal from "./MovieModal";

export default {
    name: "MovieCard",

    props: ["movie"],

    components: {
        HeartRating,
        MovieModal
    },

    data() {
        return {
            open_modal: false
        };
    },

    watch: {
        movie() {
            this.change_background_img();
        }
    },

    methods: {
        change_background_img() {
            if (this.movie) {
                this.$refs.card.style.backgroundImage = `var(--dark-alpha-gradient),
                    url("${this.movie.poster}")`;
            } else {
                this.$refs.card.style.backgroundImage = `url("${require("@/assets/video-camera-vazio.png")}")`;
            }
        }
    }
};
</script>

<style scoped>
.card {
    position: relative;
    max-width: 700px;
    height: 460px;
    margin: 0.5vw auto 3.5vw;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
}

.card-content {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 1.5vw;
    color: #e3e3e1;
    font-size: 0.9rem;
    font-weight: bold;
}

.title {
    width: 70%;
    color: white;
    text-transform: uppercase;
    font-size: 1.9rem;
    font-weight: bolder;
    text-align: left;
}

.info-container {
    display: flex;
    justify-content: space-between;
}

.rating {
    align-self: flex-end;
}

.rating .user-count {
    width: max-content;
}

.extra-info {
    text-align: left;
    margin: 10px 0;
}

.overview-container {
    display: flex;
    justify-content: space-between;
}

.overview-container p {
    width: 85%;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}

.overview-container button {
    width: 80px;
    color: var(--light-red);
    background-color: transparent;
    text-transform: none;
    text-decoration: underline;
    font-weight: bold;
}

.overview-container button:hover {
    color: var(--red);
}

@media (max-width: 550px) {
    .card {
        margin: 40px auto 20px;
    }

    .extra-info {
        display: none;
    }

    .info-container {
        margin-bottom: 20px;
    }
}

@media (max-width: 450px) {
    .card-content {
        padding: 15px;
    }

    .info-container {
        flex-wrap: wrap;
    }

    .title {
        width: 100%;
        margin-bottom: 10px;
        font-size: 1.5rem;
    }

    .rating {
        width: 100%;
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
    }

    .rating .user-count {
        font-size: 12px;
    }

    .overview-container p {
        width: 60%;
    }
}

@media (max-width: 350px) {
    .card {
        max-width: 294px;
        height: 350px;
    }
}
</style>
