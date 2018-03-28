<template>
    <div>
        <component :is="Search"></component>
    </div>
</template>

<style>

</style>

<script>
    import Search from './Search.vue';
    export default {
        components: {
            Search
        },

        data() {
            return {
                Search
            }
        }
    }
</script>