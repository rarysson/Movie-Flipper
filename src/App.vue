<template>
    <div id="app">
        <router-view />
    </div>
</template>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    height: 100vh;
}

:root {
    --red: #ff1c1c;
    --light-red: #ff5656;
}

/* Configurações de Reset */
*,
*::before,
*::after {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

button {
    cursor: pointer;
    font-family: inherit;
}
</style>
