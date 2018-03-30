<template>
    <div class="content" :style="{height: componentHeight}">
        <component :is="ScrollableTabView" :scrollItems="scrollItems" :scrollHeight="scrollTabHeight" :componentHeight="componentHeight">
            <component :is="activeScrollItem" :height="componentHeight"></component>
        </component>
    </div>
</template>

<style>

    .content {
        /*background-color: red;*/
        /*width: 500px;*/
        /*height: 500px;*/
        /*padding: 0 0 1px 0;*/
    }

</style>

<script>
    import ScrollableTabView from '../../../commons/components/ScrollableTabView.vue';
    import Focus from './Focus.vue';
    import Hot from './Hot.vue';
    import Recomand from './Recomand.vue';
    import Animation from './Animation.vue';
    import utils from '../../../commons/utils/utils';

    const modal = weex.requireModule('modal');

    const SCROLLTABHEIGHT = 100;
    const TABBARHEIGHT = 250;
    export default {
//        props: ['height'],
        components: {
            ScrollableTabView,
            Focus,
            Hot,
            Recomand,
            Animation
        },
        data() {
            return {
                scrollTabHeight: SCROLLTABHEIGHT,
                componentHeight: utils.DEVICEHEIGHT - SCROLLTABHEIGHT - TABBARHEIGHT,
                ScrollableTabView,
                activeScrollItem: Animation,
                scrollItems: [
                    {
                        tabBarUnderlineStyle: {
                            borderBottomWidth: '4px'
                        },
                        tabBarBackgroundColor: '#fff',
                        tabBarActiveTextColor: 'blue',
                        tabBarInactiveTextColor: 'black',
                        tabBarTextStyle: {
                            fontSize: '30px'
                        },
                        title: '关注',
                        component: Focus,
                        active: false,
                        onPress: (item) => {
                            this.activeScrollItem = item.component;
                        }
                    },
                    {
                        tabBarUnderlineStyle: {
                            borderBottomWidth: '3px'
                        },
                        tabBarBackgroundColor: '#fff',
                        tabBarActiveTextColor: 'blue',
                        tabBarInactiveTextColor: 'black',
                        tabBarTextStyle: {
                            fontSize: '30px'
                        },
                        title: '推荐',
                        component: Recomand,
                        active: false,
                        onPress: (item) => {
                            this.activeScrollItem = item.component;
                        }
                    },
                    {
                        tabBarUnderlineStyle: {
                            borderBottomWidth: '3px'
                        },
                        tabBarBackgroundColor: '#fff',
                        tabBarActiveTextColor: 'blue',
                        tabBarInactiveTextColor: 'black',
                        tabBarTextStyle: {
                            fontSize: '30px'
                        },
                        title: '热搜',
                        component: Hot,
                        active: false,
                        onPress: (item) => {
                            this.activeScrollItem = item.component;
                        }
                    },
                    {
                        tabBarUnderlineStyle: {
                            borderBottomWidth: '4px'
                        },
                        tabBarBackgroundColor: '#fff',
                        tabBarActiveTextColor: 'blue',
                        tabBarInactiveTextColor: 'black',
                        tabBarTextStyle: {
                            fontSize: '30px'
                        },
                        title: '动画',
                        component: Animation,
                        active: true,
                        onPress: (item) => {
                            this.activeScrollItem = item.component;
                        }
                    },
                ]
            }
        }
    }

</script>

