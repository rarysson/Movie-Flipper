import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../pages/Home.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Home",
        component: Home
    },
    {
        path: "/likes",
        name: "Likes",
        component: () => import("../pages/Likes.vue")
    },
    {
        path: "/dislikes",
        name: "Dislikes",
        component: () => import("../pages/Dislikes.vue")
    }
];

if (process.env.MODE !== "ssr") {
    routes.push({
        path: "*",
        component: () => import("../pages/Page404.vue")
    });
}

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
