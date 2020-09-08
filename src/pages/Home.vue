<template>
    <div class="container" ref="container">
        <routes-header />

        <div class="movie-container">
            <movie-card :movie="current_movie" ref="movie" />
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
            max_index: 0,
            on_animation: false
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

        ...mapActions([
            "set_movies",
            "like_movie",
            "dislike_movie",
            "skip_movie"
        ]),

        like() {
            if (this.max_index > 0 && !this.on_animation) {
                this.change_movie(this.like_movie, "like");
            }
        },

        skip() {
            if (this.max_index > 0 && !this.on_animation) {
                this.change_movie(this.skip_movie, "skip");
            }
        },

        dislike() {
            if (this.max_index > 0 && !this.on_animation) {
                this.change_movie(this.dislike_movie, "dislike");
            }
        },

        change_movie(action, action_type) {
            this.$refs.movie.$el.classList.add(action_type);
            this.on_animation = true;

            setTimeout(() => {
                action(this.current_movie);
                this.max_index--;
                this.current_index %= this.max_index;
                this.$refs.movie.$el.classList.remove(action_type);
                this.current_movie = this.movies()[this.current_index];
                this.change_background_img();
                this.on_animation = false;
            }, 330);
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
