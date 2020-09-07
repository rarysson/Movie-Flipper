<template>
    <div class="heart">
        <span class="heart-border"></span>
        <div class="heart-color-width" ref="heart_width">
            <span class="heart-color"></span>
        </div>
    </div>
</template>

<script>
export default {
    name: "HeartRating",

    props: ["value"],

    mounted() {
        this.$refs.heart_width.style.width = `${this.value * 10}%`;
    },

    watch: {
        value() {
            this.$refs.heart_width.style.width = `${this.value * 10}%`;
        }
    }
};
</script>

<style scoped>
.heart {
    position: relative;
    width: 115px;
    height: 20px;
    margin-bottom: 5px;
}

.heart span {
    display: inline-block;
    width: 100%;
    height: 20px;
}

.heart-border {
    background-image: url("../assets/favorite_.png");
    background-size: contain;
}

.heart-color-width {
    position: absolute;
    top: 0;
    left: 0;
    overflow: hidden;
    width: 100%;
}

.heart span.heart-color {
    width: 115px;
    height: 20px;
    background-image: url("../assets/favorite.png");
    background-size: contain;
}
</style>
