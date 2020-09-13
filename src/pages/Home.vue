<template>
    <div class="container" ref="container">
        <routes-header />

        <div class="movie-container">
            <movie-card
                :movie="current_movie"
                :loading-effect="on_loading_movies"
                ref="movie"
            />
        </div>

        <btn-group @like="like" @skip="skip" @dislike="dislike" />
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
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
            movies: 0,
            on_animation: false,
            on_loading_movies: false
        };
    },

    async mounted() {
        if (
            this.movies_total() === 0 &&
            this.likes().length === 0 &&
            this.dislikes().length === 0
        ) {
            try {
                this.on_loading_movies = true;
                await this.set_movies();
                this.on_loading_movies = false;
            } catch (error) {
                console.log(error);
            }
        }

        this.movies = this.movies_total();
        this.current_movie = this.first_movie();
        this.change_background_img();
    },

    methods: {
        ...mapGetters(["first_movie", "movies_total", "likes", "dislikes"]),

        ...mapActions([
            "set_movies",
            "like_movie",
            "dislike_movie",
            "skip_movie"
        ]),

        like() {
            if (this.movies > 0 && !this.on_animation) {
                this.change_movie(this.like_movie, "like");
            }
        },

        skip() {
            if (this.movies > 0 && !this.on_animation) {
                this.change_movie(this.skip_movie, "skip");
            }
        },

        dislike() {
            if (this.movies > 0 && !this.on_animation) {
                this.change_movie(this.dislike_movie, "dislike");
            }
        },

        change_movie(action, action_type) {
            this.$refs.movie.$el.classList.add(action_type);
            this.on_animation = true;

            setTimeout(() => {
                action(this.current_movie);
                this.$refs.movie.$el.classList.remove(action_type);
                this.current_movie = this.first_movie();
                this.change_background_img();
                this.movies = this.movies_total();
                this.on_animation = false;
            }, 330);
        },

        change_background_img() {
            if (this.movies > 1) {
                this.$refs.container.style.backgroundImage = `var(--red-alpha-gradient),
                    url("${this.get_poster()}")`;
            } else {
                this.$refs.container.style.backgroundImage =
                    "var(--red-gradient)";
            }
        },

        get_poster() {
            const width = this.$refs.container.offsetWidth;

            if (this.current_movie) {
                if (width > 500) {
                    return this.current_movie.poster_xl;
                } else if (width > 350) {
                    return this.current_movie.poster_lg;
                } else {
                    return this.current_movie.poster_md;
                }
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
    overflow: hidden;
}

.like {
    animation: like 0.35s;
}

.dislike {
    animation: dislike 0.35s;
}

.skip {
    animation: skip 0.35s;
}

@keyframes like {
    100% {
        opacity: 0;
        transform: translateX(150%);
    }
}

@keyframes dislike {
    100% {
        opacity: 0;
        transform: translateX(-150%);
    }
}

@keyframes skip {
    100% {
        opacity: 0;
        transform: scale(3);
    }
}
</style>
