<template>
    <div>
        <button @click="test">Click</button>
    </div>
</template>

<script>
import api from "../util/api";

export default {
    name: "HomePage",

    methods: {
        async test() {
            try {
                const r = await api.get_movies();
                console.log(r);
            } catch (error) {
                console.log(error);
            }
        }
    }
};
</script>
