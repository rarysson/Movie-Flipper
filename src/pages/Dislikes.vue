<template>
    <div class="container">
        <routes-header class="r-header" />

        <div class="content-container">
            <h1>Filmes não curtidos</h1>
        </div>
    </div>
</template>

<script>
import RoutesHeader from "@/components/RoutesHeader";

export default {
    name: "DislikesPage",

    components: {
        RoutesHeader
    }
};
</script>

<style scoped>
@import "../styles/movies.css";
</style>
