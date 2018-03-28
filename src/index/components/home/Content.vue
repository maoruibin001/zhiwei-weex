<template>
    <div class="content">
        <component :is="ScrollableTabView" :scrollItems="scrollItems">
            <component :is="activeScrollItem"></component>
        </component>
    </div>
</template>

<style>

    .content {
        background-color: #eee;
    }

</style>

<script>
    import ScrollableTabView from '../../../components/ScrollableTabView.vue';
    import Focus from './Focus.vue';
    import Hot from './Hot.vue';
    import Recomand from './Recomand.vue';
    export default {
        components: {
            ScrollableTabView,
            Focus,
            Hot,
            Recomand
        },
        data() {
            return {
                ScrollableTabView,
                activeScrollItem: Focus,
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
                        active: true,
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
                    }
                ]
            }
        }
    }

</script>

