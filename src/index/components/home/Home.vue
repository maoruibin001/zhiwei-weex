<template>
    <div>
        <component :is="Search"></component>
        <component :is="Content"></component>
    </div>
</template>

<style>

</style>

<script>
    import Search from './Search.vue';
    import Content from './Content.vue';
    export default {
        components: {
            Search,
            Content
        },

        data() {
            return {
                Search,
                Content
            }
        }
    }
</script>