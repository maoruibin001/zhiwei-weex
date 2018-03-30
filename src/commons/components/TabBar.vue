<template>
    <div class="tabBox" :style="{height:`${totalheight}px`}">
        <div class="content" :style="{height: `${scrollerHeight}px`}">
            <div :style="{height: `${scrollerHeight}px`}">
                <slot></slot>
                <!--<text>hello world</text>-->
            </div>
        </div>
        <div class="nav" :style="{height: `${barHeight}px`, width: `${deviceWidth}px`}">
            <div class="link"  v-for="item in barItems" @click="press(item, barItems)" :style="{color:item.selected ? '#00BBE4' : 'gray'}">
                <!--<image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>-->
                <div class="imgBox" >
                    <image style="width: 50px;height:50px;" :src="item.renderIcon"></image>
                    <text class="title"  :style="{color:item.selected ? '#00BBE4' : 'gray'}">{{item.title}}</text>
                </div>

            </div>
        </div>
    </div>
</template>
<style scoped>
    .content {
        overflow-y: scroll;
        padding: 0 0 1px 0;
    }
    .nav {
        position: absolute;
        z-index: 1000;
        bottom: 0;
        left: 0;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        background-color: #fff;
        border: 1px solid #efefef;
        box-shadow: 20px 20px 20px #000;
    }
    .title {
        padding: 1em;
        font-size: 30px;
    }
    .imgBox {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 10px;
    }
    .title {
        padding: 0;
    }

</style>
<script>
    const TABBARHEIGHT = 150;
    const modal = weex.requireModule('modal');

    import utils from '../utils/utils';

    export default {
        props: ['barItems'],
        data () {
            return {
                page: 1,
                totalheight: utils.DEVICEHEIGHT,
                scrollerHeight: utils.DEVICEHEIGHT - TABBARHEIGHT,
                barHeight: TABBARHEIGHT,
                deviceWidth: utils.DEVICEWIDTH
            }
        },
        methods:{
            press(item, barItems) {
                barItems.forEach(e => e.selected = false);
                item.selected = true;
                typeof item.onPress === 'function' && item.onPress(item)
            }
        }
    }
</script>