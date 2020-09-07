<template>
    <div class="container" ref="container">
        <routes-header />

        <div class="card" ref="card">
            <div class="card-content" v-if="current_movie">
                <div class="info-container">
                    <p class="title">{{ current_movie.title }}</p>

                    <div class="rating">
                        <span class="heart"></span>
                        <p class="user-count">
                            ({{ current_movie.rating_count }} avaliações)
                        </p>
                    </div>
                </div>

                <p class="extra-info">
                    {{ current_movie.year }} •
                    {{
                        current_movie.genres.reduce((acc, cv) => acc + "/" + cv)
                    }}
                    • {{ Math.floor(current_movie.runtime / 60) }}H
                    {{ current_movie.runtime % 60 }}M
                </p>

                <div class="overview-container">
                    <p>{{ current_movie.overview }}</p>

                    <button>Ver Sinopse</button>
                </div>
            </div>
        </div>

        <btn-group @like="like" @skip="skip" @dislike="dislike" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import API from "@/util/api";
import RoutesHeader from "@/components/RoutesHeader";
import BtnGroup from "@/components/Home/BtnGroup";

export default {
    name: "HomePage",

    components: {
        RoutesHeader,
        BtnGroup
    },

    data() {
        return {
            current_movie: null,
            current_index: 0,
            max_index: 0
        };
    },

    async mounted() {
        if (
            this.movies().length === 0 &&
            this.likes().length === 0 &&
            this.dislikes().length === 0
        ) {
            try {
                const movies = await API.get_movies();

                this.set_movies(movies);
                this.max_index = movies.length;
                this.current_movie = movies[0];
                this.change_background_img();
            } catch (error) {
                console.log(error);
            }
        } else {
            this.max_index = this.movies().length;
            this.current_movie = this.movies()[this.current_index];
            this.change_background_img();
        }
    },

    methods: {
        ...mapGetters(["movies", "likes", "dislikes"]),

        ...mapActions(["set_movies", "like_movie", "dislike_movie"]),

        like() {
            if (this.max_index > 0) {
                this.like_movie(this.current_movie);
                this.max_index--;
                this.current_index %= this.max_index;
                this.current_movie = this.movies()[this.current_index];
                this.change_background_img();
            }
        },

        skip() {
            if (this.max_index > 0) {
                this.current_index = (this.current_index + 1) % this.max_index;
                this.current_movie = this.movies()[this.current_index];
                this.change_background_img();
            }
        },

        dislike() {
            if (this.max_index > 0) {
                this.dislike_movie(this.current_movie);
                this.max_index--;
                this.current_index %= this.max_index;
                this.current_movie = this.movies()[this.current_index];
                this.change_background_img();
            }
        },

        change_background_img() {
            if (this.max_index > 0) {
                this.$refs.card.style.backgroundImage = `var(--dark-alpha-gradient),
                    url("${this.current_movie.poster}")`;
                this.$refs.container.style.backgroundImage = `var(--red-alpha-gradient),
                    url("${this.current_movie.poster}")`;
            } else {
                this.$refs.card.style.backgroundImage = `url("${require("@/assets/video-camera-vazio.png")}")`;
                this.$refs.container.style.backgroundImage =
                    "var(--red-gradient)";
            }
        }
    }
};
</script>

<style scoped>
.container {
    background-image: var(--red-gradient);
    background-repeat: no-repeat;
    background-size: cover;
    background-position-y: center;
}

.card {
    position: relative;
    max-width: 700px;
    height: 460px;
    margin: 3.5vw auto;
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
    padding: 1vw;
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

.rating span {
    position: relative;
    display: block;
    margin-bottom: 5px;
    width: 130px;
    height: 20px;
    background-image: url("../assets/favorite.png");
    background-repeat: space;
}

.rating span::after {
    content: "";
    position: absolute;
    width: 130px;
    height: 20px;
    top: 0;
    left: 0;
    background-image: url("../assets/favorite_.png");
    background-repeat: space;
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
</style>
