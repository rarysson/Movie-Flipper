<template>
    <div
        class="card"
        :style="{
            backgroundImage: `var(--dark-alpha-gradient), url('${movie.poster}')`
        }"
    >
        <div class="card-content">
            <div class="info-container">
                <p class="title">{{ movie.title }}</p>

                <div class="rating">
                    <heart-rating :value="movie.rating" />

                    <p class="user-count">
                        ({{ movie.rating_count }} avaliações)
                    </p>
                </div>
            </div>

            <div class="overview-container">
                <p>{{ movie.overview }}</p>

                <button @click="open_modal = true">Ver Sinopse</button>
            </div>
        </div>

        <movie-modal v-model="open_modal" :movie="movie" />
    </div>
</template>

<script>
import HeartRating from "./HeartRating";
import MovieModal from "./MovieModal";

export default {
    name: "MovieCardListItem",

    props: ["movie"],

    components: {
        HeartRating,
        MovieModal
    },

    data() {
        return {
            open_modal: false
        };
    }
};
</script>

<style scoped>
.card {
    width: 294px;
    height: 350px;
    position: relative;
    color: #e3e3e1;
    border-radius: 5px;
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
}

.card-content {
    position: absolute;
    width: 100%;
    bottom: 0;
    left: 0;
    padding: 15px;
}

.title {
    width: 100%;
    margin-bottom: 10px;
    font-size: 1.3rem;
    color: white;
    text-transform: uppercase;
    font-weight: bolder;
    text-align: left;
}

.rating {
    width: 100%;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 10px 0 15px;
}

.rating .user-count {
    width: max-content;
    font-size: 12px;
    font-weight: bold;
    color: white;
}

.overview-container {
    display: flex;
    justify-content: space-between;
}

.overview-container p {
    width: 60%;
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

@media (max-width: 700px) {
    .card {
        width: 145px;
        height: 174px;
    }

    .title {
        font-size: 0.9rem;
    }

    .rating {
        margin: 5px 0 0;
    }

    .user-count,
    .overview-container {
        display: none;
    }
}
</style>
