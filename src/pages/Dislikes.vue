<template>
    <div class="container">
        <routes-header class="r-header" />

        <h1>Filmes não curtidos</h1>

        <div v-if="dislikes().length > 0" class="content-container">
            <movie-card-list-item
                v-for="(movie, index) in dislikes()"
                :key="index"
                :movie="movie"
            />
        </div>

        <div v-else class="empty-msg-container">
            <img src="../assets/video-camera-vazio.png" alt="" />
            <p>Nenhum filme</p>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import RoutesHeader from "@/components/RoutesHeader";
import MovieCardListItem from "@/components/MovieCardListItem";

export default {
    name: "DislikesPage",

    components: {
        RoutesHeader,
        MovieCardListItem
    },

    methods: {
        ...mapGetters(["dislikes"])
    }
};
</script>

<style scoped>
@import "../styles/movies.css";
</style>
