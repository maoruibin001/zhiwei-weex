<template>
    <div class="searchBox" @click="toSearch()" :style="{height: `${height}px`}">
        <div class="searchInput">
            <div class="searchImage">
                <image  style="height: 40px; width: 40px;" src="/src/images/search.png"></image>
            </div>
            <text class="searchText">搜索</text>
        </div>
    </div>
</template>

<style scoped>
    .searchBox {
        padding: 10px 20px;
        background-color: blue;
        position:relative;
        /*height: 100px;*/
    }
    .searchInput {
        background-color: #fff;
        border-radius: 10px;
        height: 80px;
        display: flex;
        flex-direction: row;
        align-items: center;
    }
    .searchImage {
        padding: 0 20px;
    }

    .searchText {
        color: #888;
    }
</style>

<script>

    export default {
        props: ['height'],
        methods: {
            toSearch() {
                this.$router.push({
                    name: 'Search',
                    query: {
                        name: 'maoruibin',
                        from: 'Index'
                    }
                });
            }
        }
    }
</script>