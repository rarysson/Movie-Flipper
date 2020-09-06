import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        movies: [],
        likes: [],
        dislikes: []
    },

    getters: {
        movies: state => state.movies,
        likes: state => state.likes,
        dislikes: state => state.dislikes
    },

    actions: {
        set_movies({ commit }, movies) {
            commit("set_movies", movies);
        },

        like({ commit }, movie) {
            commit("like_movie", movie);
        },

        dislike({ commit }, movie) {
            commit("dislike_movie", movie);
        }
    },

    mutations: {
        set_movies(state, movies) {
            state.movies = movies;
        },

        like_movie(state, movie) {
            const index = state.movies.findIndex(m => m.id === movie.id);
            state.movies.splice(index, 1);
            state.likes.unshift(movie);
        },

        dislike_movie(state, movie) {
            const index = state.movies.findIndex(m => m.id === movie.id);
            state.movies.splice(index, 1);
            state.dislikes.unshift(movie);
        }
    }
});
