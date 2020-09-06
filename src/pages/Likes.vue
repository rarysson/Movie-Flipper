<template>
    <div class="container">
        <routes-header class="r-header" />

        <div class="content-container">
            <h1>Filmes curtidos</h1>
        </div>
    </div>
</template>

<script>
import RoutesHeader from "@/components/RoutesHeader";

export default {
    name: "LikesPage",

    components: {
        RoutesHeader
    }
};
</script>

<style scoped>
@import "../styles/movies.css";
</style>
