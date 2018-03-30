<template>
    <div class="animationBox" :style="{width: `${width}px`, height:`${height}px`}">
        <text class="beginBtn" @click="go">go</text>
    </div>
</template>

<style scoped>

    .animationBox {
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
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

    import utils from '../../../commons/utils/utils';
    export default {
        data() {
            return {
                width: utils.DEVICEWIDTH,
                height: utils.DEVICEHEIGHT - 300
            }
        },
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