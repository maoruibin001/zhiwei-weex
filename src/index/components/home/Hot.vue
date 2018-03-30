<template>
    <div class="hot" :style="{height: `${height}px`}">
        <text>i am hot</text>
    </div>
</template>

<script>
    export default {
        props: ['height'],
    }
</script>

<style>
    .hot {
        background-color: red;
    }
</style>