<template>
    <div id="app">
        <transition mode="out-in">
            <router-view />
        </transition>
    </div>
</template>

<style>
@import "./styles/reset.css";
@import "./styles/global.css";
@import "./styles/variables.css";

#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
}
</style>
