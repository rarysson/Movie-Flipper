<template>
    <div class="container" ref="container">
        <routes-header />

        <div class="movie-container">
            <movie-card :movie="current_movie" />
        </div>

        <btn-group @like="like" @skip="skip" @dislike="dislike" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import API from "@/util/api";
import RoutesHeader from "@/components/RoutesHeader";
import BtnGroup from "@/components/Home/BtnGroup";
import MovieCard from "@/components/MovieCard";

export default {
    name: "HomePage",

    components: {
        RoutesHeader,
        BtnGroup,
        MovieCard
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
            } catch (error) {
                console.log(error);
            }
        }

        this.max_index = this.movies().length;
        this.current_movie = this.movies()[this.current_index];
        this.change_background_img();
    },

    methods: {
        ...mapGetters(["movies", "likes", "dislikes"]),

        ...mapActions(["set_movies", "like_movie", "dislike_movie"]),

        like() {
            if (this.max_index > 0) {
                this.like_movie(this.current_movie);
                this.max_index--;
                this.current_index %= this.max_index;
                this.change_movie();
            }
        },

        skip() {
            if (this.max_index > 0) {
                this.current_index = (this.current_index + 1) % this.max_index;
                this.change_movie();
            }
        },

        dislike() {
            if (this.max_index > 0) {
                this.dislike_movie(this.current_movie);
                this.max_index--;
                this.current_index %= this.max_index;
                this.change_movie();
            }
        },

        change_movie() {
            this.current_movie = this.movies()[this.current_index];
            this.change_background_img();
        },

        change_background_img() {
            if (this.max_index > 0) {
                this.$refs.container.style.backgroundImage = `var(--red-alpha-gradient),
                    url("${this.current_movie.poster}")`;
            } else {
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
    background-position-x: center;
}

.movie-container {
    width: 100%;
    padding: 0 3vw;
}
</style>
