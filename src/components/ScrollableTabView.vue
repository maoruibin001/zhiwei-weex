<script src="../../../../duanjunfeng/workspaces2/zuche/zuche-webopration/release/release/zuche-weboperation/v2/modules/order/query/data.js"></script>
<template>
<div>
    <div class="tabBarBox">
        <div class="item"  v-for="item in scrollItems" @click="press(item, scrollItems)" :style="{
                borderBottomColor: item.active ? (item.tabBarUnderlineStyle.borderColor || 'blue') : '',
                borderBottomWidth: item.active ? (item.tabBarUnderlineStyle.borderBottomWidth || '2px') :  '0',
                borderBottomStyle: item.active ? (item.tabBarUnderlineStyle.borderBottomStyle || 'solid') :  '',
                backgroundColor: item.active ? (item.tabBarBackgroundColor || '#fff') : '#fff'
        }">
            <!--<text>{{item.tabBarUnderlineStyle}}</text>-->
            <!--<image style="width:500px;height:500px" src="https://vuejs.org/images/logo.png"></image>-->
            <div class="textBox" :style="{

            }">
                <text class="title"  :style="{
                color:item.active ? (item.tabBarActiveTextColor || 'blue') : (item.tabBarInactiveTextColor || 'black'),
                fontSize: item.tabBarTextStyle.fontSize ? item.tabBarTextStyle.fontSize : '',

            }">{{item.title}}</text>
            </div>

        </div>
    </div>
    <div class="content" @touchstart="start" @touchmove="move" @touchend="end">
        <slot></slot>
    </div>
</div>
</template>

<style>
    .tabBarBox {
        display: flex;
        flex-direction: row;
        height: 100px;
        justify-content: space-around;
        background-color: #fff;
    }

    .item {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 20px 70px;
    }

    .title {
        font-weight: 500;
    }
</style>

<script>
    const DISTANCE = 50;
    const PLATFORM = weex.config.env.platform;
    const modal = weex.requireModule('modal')
    export default {
        props: ['scrollItems'],
        data() {
            return {
                startX: 0,
                currentX: 0,
                isTab: false,
                currentItem: null,
            }
        },
        mounted() {
            this.currentItem = this.scrollItems.filter(e => e.active)[0] || this.scrollItems[0];
        },
        methods: {
            press(item, scrollItems) {
                this.currentItem = item;
                scrollItems.forEach(e => e.active = false);
                item.active = true;
                typeof item.onPress === 'function' && item.onPress(item);
            },
            tabChild(isLeft) {
                if (this.currentItem) {
                    let index = this.scrollItems.indexOf(this.currentItem);
                    if (isLeft) {
                        if (index < this.scrollItems.length - 1) {
                            this.press(this.scrollItems[index + 1], this.scrollItems);
                        }
                    } else {
                        if (index > 0) {
                            this.press(this.scrollItems[index - 1], this.scrollItems);
                        }
                    }
                }
            },
            getXOffset(event) {
                return PLATFORM === 'Web' ? event.touches[0].clientX : event.changedTouches[0].screenX;
            },
            start(event) {
                this.isTab = false;
                this.startX = this.getXOffset(event);
            },
            move(event) {
                this.currentX = this.getXOffset(event);
                if (this.currentX - this.startX < -DISTANCE && !this.isTab) {
                    //左滑动
                    this.isTab = true;
                    this.tabChild(true);

                } else if (this.currentX - this.startX > DISTANCE && !this.isTab) {
                    //右滑动
                    this.isTab = true;
                    this.tabChild(false);
                }
            },
            end(event) {
                this.startX = 0;
                this.currentX = 0;
            },
        },

    }
</script>