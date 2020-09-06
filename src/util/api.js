/* eslint-disable no-useless-catch */
import axios from "axios";

const API = axios.create({
    baseURL: "https://api.themoviedb.org/4",
    headers: { Authorization: "Bearer " + process.env.VUE_APP_TOKEN },
    params: {
        language: "pt-BR"
    }
});

async function get_extra_info(movie_id) {
    try {
        const response = await axios.get(
            `https://api.themoviedb.org/3/movie/${movie_id}`,
            {
                params: {
                    api_key: process.env.VUE_APP_V3_TOKEN,
                    language: "pt-BR"
                }
            }
        );
        const data = response.data;
        const info = { genres: [], runtime: null };

        data.genres.forEach(genre => {
            info.genres.push(genre.name);
        });

        info.runtime = data.runtime;

        return info;
    } catch (error) {
        throw error;
    }
}

API.get_movies = async () => {
    try {
        const response = await API.get("list/1");
        const data = response.data.results;
        const IMG_URL = "https://image.tmdb.org/t/p/w500";
        const movies = [];

        data.forEach(async movie => {
            const extra_info = await get_extra_info(movie.id);

            movies.push({
                id: movie.id,
                title: movie.title,
                poster: IMG_URL + movie.poster_path,
                year: movie.release_date.slice(0, 4),
                genres: extra_info.genres,
                rating: movie.vote_average,
                rating_count: movie.vote_count,
                overview: movie.overview,
                runtime: extra_info.runtime
            });
        });

        return movies;
    } catch (error) {
        throw error;
    }
};

export default API;
