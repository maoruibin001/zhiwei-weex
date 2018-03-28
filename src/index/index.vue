<template>
    <div>
        <component :is="currentView2" :barItems="barItems">
            <component :is="currentView"></component>
        </component>
    </div>
</template>

<script>
    import TabBar from '../components/TabBar';
    import Home from './components/home/Home.vue';
    import Mine from './components/mine/Mine.vue';
    import Open from './components/open/Open.vue';
    import Tech from './components/Tech/Tech.vue';
    export default {
        components: {
            TabBar,
            Home,
            Mine,
            Open,
            Tech
        },
        data() {
            let self = this;
            return {
                selectd: 'home',
                barItems: [
                    {
                        title: '首页',
                        component: Home,
                        titleStyle: {},
                        selected: true,
                        renderIcon: '/src/images/cottage.png',
                        onPress: (item) => {
                            self.currentView = item.component;
                        }
                    },

                    {
                        title: '技术',
                        component: Tech,
                        titleStyle: {},
                        selected: this.selectd === 'tech',
                        renderIcon: '/src/images/robot.png',
                        onPress: (item) => {
                            self.currentView = item.component;
                        }
                    },

                    {
                        title: '开源',
                        component: Open,
                        titleStyle: {},
                        selected: this.selectd === 'open',
                        renderIcon: '/src/images/open-source.png',
                        onPress: (item) => {
                            self.currentView = item.component;
                        }
                    },

                    {
                        title: '我的',
                        component: Mine,
                        titleStyle: {},
                        selected: this.selectd === 'mine',
                        renderIcon: '/src/images/my.png',
                        onPress: (item) => {
                            self.currentView = item.component;
                        }
                    },

                ],
                currentView: Home,
                currentView2: TabBar
            }
        },
        methods: {
        }
    }
</script>

<style>

</style>