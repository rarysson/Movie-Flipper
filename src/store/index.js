import Vue from "vue";
import Vuex from "vuex";
import API from "../util/api";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        likes: [],
        dislikes: [],
        current_page: 1,
        total_pages: 1
    },

    getters: {
        movies: state => state.movies,
        likes: state => state.likes,
        dislikes: state => state.dislikes,
        first_movie: state => state.movies[0],
        movies_total: state => state.movies.length
    },

    actions: {
        async set_movies({ commit }) {
            const [movies, total_pages] = await API.get_movies();

            commit("set_movies", { movies, total_pages });
        },

        async update_movies({ commit }) {
            commit("increment_page", movies);

            const [movies] = await API.get_movies(this.state.current_page);

            commit("update_movies", movies);
        },

        like_movie({ commit }, movie) {
            commit("remove_movie", movie);
            commit("like_movie", movie);

            if (
                need_update_list(
                    this.state.movies.length,
                    this.state.current_page,
                    this.state.total_pages
                )
            ) {
                this.dispatch("update_movies");
            }
        },

        dislike_movie({ commit }, movie) {
            commit("remove_movie", movie);
            commit("dislike_movie", movie);

            if (
                need_update_list(
                    this.state.movies.length,
                    this.state.current_page,
                    this.state.total_pages
                )
            ) {
                this.dispatch("update_movies");
            }
        },

        skip_movie({ commit }, movie) {
            commit("remove_movie", movie);

            if (
                need_update_list(
                    this.state.movies.length,
                    this.state.current_page,
                    this.state.total_pages
                )
            ) {
                this.dispatch("update_movies");
            }
        }
    },

    mutations: {
        set_movies(state, { movies, total_pages }) {
            state.movies = movies;
            state.total_pages = total_pages;
        },

        update_movies(state, movies) {
            state.movies.push(...movies);
        },

        increment_page(state) {
            state.current_page++;
        },

        like_movie(state, movie) {
            state.likes.unshift(movie);
        },

        dislike_movie(state, movie) {
            state.dislikes.unshift(movie);
        },

        remove_movie(state, movie) {
            const index = state.movies.findIndex(m => m.id === movie.id);
            state.movies.splice(index, 1);
        }
    }
});

function need_update_list(movies_total, current_page, max_page) {
    const half_of_list = 10;

    return current_page === max_page ? false : movies_total <= half_of_list;
}
