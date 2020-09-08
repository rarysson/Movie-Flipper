<template>
    <div class="sidebar-container">
        <transition
            name="sidebar"
            @enter="show_sidebar_menu"
            @before-leave="hide_sidebard_menu"
        >
            <nav v-if="open_sidebar_menu" class="nav-sidebar" ref="sidebar">
                <router-link to="/">
                    <button>Filmes não curados</button>
                </router-link>
                <router-link to="/likes">
                    <button>Filmes curtidos</button>
                </router-link>
                <router-link to="/dislikes">
                    <button>Filmes não curtidos</button>
                </router-link>
            </nav>
        </transition>

        <button
            class="sidebar-menu-btn"
            @click="open_sidebar_menu = !open_sidebar_menu"
        >
            <img src="../assets/menu-lateral.png" alt="botão de menu lateral" />
        </button>
    </div>
</template>

<script>
let container = document.querySelector(".container");
let app = document.getElementById("app");

export default {
    name: "SidebarMenu",

    data() {
        return {
            open_sidebar_menu: false
        };
    },

    mounted() {
        container = document.querySelector(".container");
        app = document.getElementById("app");
    },

    destroyed() {
        this.hide_sidebard_menu();
    },

    methods: {
        show_sidebar_menu() {
            app.style.overflow = "hidden";
            app.style.backgroundColor = "#444";
            container.style.transform = "translateX(250px)";
        },

        hide_sidebard_menu() {
            app.style.overflow = "auto";
            container.style.transform = "translateX(0)";

            // Delay para definir valor após terminar animação do container
            setTimeout(() => (app.style.backgroundColor = "unset"), 300);
        }
    }
};
</script>

<style scoped>
.sidebar-container {
    position: relative;
}

.nav-sidebar {
    position: fixed;
    top: 0;
    left: -250px;
    width: 250px;
    min-height: 100vh;
    padding: 0 20px;
    background-color: #444444;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 999;
}

.sidebar-enter-active,
.sidebar-leave-active {
    transition: all 0.3s;
}

.sidebar-enter,
.sidebar-leave-to {
    transform: translateX(-100%);
}

.nav-sidebar button {
    width: 100%;
    font-size: 1.12rem;
    font-weight: bold;
    text-transform: uppercase;
    color: white;
    margin: 20px 0;
    background-color: transparent;
    text-align: left;
}

.nav-sidebar button:hover {
    color: var(--light-red);
}

.sidebar-menu-btn {
    position: absolute;
    top: 0;
    left: 0;
    width: auto;
    height: 30px;
    padding: 0 10px 0 20px;
    background-color: transparent;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    transition: all 0.25s;
}

.sidebar-menu-btn:hover {
    background-color: #444;
    transform: scale(1.3);
}
</style>
