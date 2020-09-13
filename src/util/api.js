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

API.get_movies = async (page = 1) => {
    try {
        const response = await API.get(`list/1?page=${page}`);
        const data = response.data.results;
        const total_pages = response.data.total_pages;
        const IMG_URL_sm = "https://image.tmdb.org/t/p/w154";
        const IMG_URL_md = "https://image.tmdb.org/t/p/w342";
        const IMG_URL_lg = "https://image.tmdb.org/t/p/w500";
        const IMG_URL_xl = "https://image.tmdb.org/t/p/w780";
        const movies = [];

        for (let movie of data) {
            const extra_info = await get_extra_info(movie.id);

            movies.push({
                id: movie.id,
                title: movie.title,
                poster_sm: IMG_URL_sm + movie.poster_path,
                poster_md: IMG_URL_md + movie.poster_path,
                poster_lg: IMG_URL_lg + movie.poster_path,
                poster_xl: IMG_URL_xl + movie.poster_path,
                year: movie.release_date.slice(0, 4),
                genres: extra_info.genres,
                rating: movie.vote_average,
                rating_count: movie.vote_count,
                overview: movie.overview,
                runtime: extra_info.runtime
            });
        }

        return [movies, total_pages];
    } catch (error) {
        throw error;
    }
};

export default API;
