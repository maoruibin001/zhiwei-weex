<template>
    <div>
        <component :is="Search" :height="inputHeight"></component>
        <component :is="Content" :height="contentHeight"></component>
    </div>
</template>

<style>

</style>

<script>
    import utils from '../../../commons/utils/utils';
    import Search from './Search.vue';
    import Content from './Content.vue';

    const INPUTHEIGHT = 100;

    export default {
        components: {
            Search,
            Content
        },

        data() {
            return {
                Search,
                Content,
                inputHeight: INPUTHEIGHT,
                contentHeight: utils.DEVICEHEIGHT - INPUTHEIGHT
            }
        }
    }
</script>