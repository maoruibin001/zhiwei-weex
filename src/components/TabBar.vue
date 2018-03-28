<template>
    <div class="p333" :style="{height:`${totalheight}px`}">
        <div class="content" :style="{height: `${scrollerHeight}px`}">
            <scroller>
                <slot></slot>
            </scroller>
        </div>
        <div class="nav" :style="{height: `${barHeight}px`}">
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
        /*background-color: red;*/
        overflow-y: scroll;
    }
    .nav {
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
    const TABBARHEIGHT = 100;
    const modal = weex.requireModule('modal');
    const WEEXDEFAULTDEVICEHEIGHT = 750; //weex默认的屏幕宽度。
    const DEVICEHEIGHT = WEEXDEFAULTDEVICEHEIGHT / weex.config.env.deviceWidth * weex.config.env.deviceHeight;

    export default {
        props: ['barItems'],
        data () {
            return {
                page: 1,
                totalheight: DEVICEHEIGHT,
                scrollerHeight: DEVICEHEIGHT - TABBARHEIGHT,
                barHeight: TABBARHEIGHT,
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