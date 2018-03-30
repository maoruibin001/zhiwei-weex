<template>
    <div class="searchBox">
        <div class="searchInput">
            <div class="searchImage" @click="back()">
                <image  style="height: 50px; width: 50px;" src="/src/images/back.png"></image>
            </div>
            <div class="inputBox">
                <input value="" v-model="searchText" :autofocus="true" return-key-type="search" width="100%" ref="input" @input="inputText" class="input" type="text" placeholder="请输入您想搜索的内容">
            </div>
            <div @click="clearIpt()" class="inputX">
                <text class="inputText" v-if="showX">X</text>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .searchBox {
        padding: 10px 20px;
        background-color: blue;
        height: 100px;
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
        /*padding: 0 20px;*/
        flex: 1;
        display: flex;
        align-items: center;
    }

    .inputBox {
        flex: 7;
        display: flex;
    }
    .input {
        display: block;
        height: 80px;
        outline: none;
        font-size: 30px;
    }
    .inputX {
        flex: 1;
    }
    .inputText {
        font-size: 30px;
    }
</style>

<script>

    const modal = weex.requireModule('modal');
    export default {
        data() {
            return {
                showX: false,
                searchText: ''
            }
        },
        methods: {
            back() {
                this.$router.push({
                    name: this.$route.query.from || 'Index',
                    query: {
                        from: 'Search'
                    }
                })
            },

            inputText(event) {
                this.showX = !!event.value;
                this.searchText = 2;
            },

            clearIpt() {
                this.searchText = '';
                setTimeout(() => {
                    this.$refs.input.focus();
                })

            }
        }
    }
</script>