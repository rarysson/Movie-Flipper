<template>
    <header>
        <sidebar-menu class="sidebar-menu" />

        <img src="../assets/logo-viva-decora.png" alt="vica decora logo" />

        <nav class="routes" ref="routes">
            <router-link to="/" class="r-btn">
                <button>Filmes não curados</button>
            </router-link>
            <router-link to="/likes" class="r-btn">
                <button>Filmes curtidos</button>
            </router-link>
            <router-link to="/dislikes" class="r-btn">
                <button>Filmes não curtidos</button>
            </router-link>
        </nav>
    </header>
</template>

<script>
import SidebarMenu from "./SidebarMenu";

export default {
    name: "RoutesHeader",

    components: {
        SidebarMenu
    },

    mounted() {
        this.$refs.routes.children[
            get_current_path_index(this.$route.path)
        ].firstChild.classList.add("active-route-effect");
    }
};

function get_current_path_index(path) {
    return path === "/" ? 0 : path === "/likes" ? 1 : 2;
}
</script>

<style scoped>
header {
    padding: 3vw 0;
    position: relative;
}

.sidebar-menu {
    display: none;
}

.routes {
    padding: 1.5vw 0 10px;
}

.routes button {
    position: relative;
    color: white;
    background-color: transparent;
    font-weight: 600;
    opacity: 0.65;
}

.routes button::before {
    content: "";
    position: absolute;
    bottom: -7px;
    left: 0;
    width: 0;
    height: 5px;
    background-color: white;
    transition: 0.3s;
}

.routes button:hover {
    opacity: 1;
}

.routes button:hover::before {
    width: 100%;
}

.routes .r-btn:nth-of-type(2) {
    margin: 0 75px;
}

button.active-route-effect {
    opacity: 1;
}

button.active-route-effect::before {
    width: 100%;
}

@media (max-width: 620px) {
    header {
        padding-top: 20px;
    }

    .routes {
        display: none;
    }

    .sidebar-menu {
        display: flex;
    }
}
</style>
