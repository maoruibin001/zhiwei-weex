<template>
    <div class="animationBox">
        <text class="beginBtn" @click="go">go</text>
    </div>
</template>

<style scoped>

    .animationBox {
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        width: 100%;
        height: 100%;

    }

    .beginBtn {
        background-color: lightseagreen;
        color: #fff;
        padding: 30px 80px;
        border-radius: 15px;
        font-size: 40px;
    }

</style>

<script>

    export default {
        methods: {
            go() {
                this.$router.push({
                    name: 'Animation',
                    query: {
                        from: 'Index',
                        usrName: 'maoruibin'
                    }
                })
            }
        }
    }
</script>