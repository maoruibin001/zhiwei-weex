<template>
    <div :style="{height: `${height}px`}">
        <text>推荐</text>
    </div>
</template>

<script>
    export default {
        props: ['height'],
    }
</script>