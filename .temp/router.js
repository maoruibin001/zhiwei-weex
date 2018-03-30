import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router';
import Index from '@/index/index.vue';
import Search from '@/commons/components/Search.vue';
import Animation from '@/commons/components/Animation.vue';

Vue.use(Router);

module.exports = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            component: Index,
            query: null
        },
        {
            path: '/search',
            name: 'Search',
            component: Search,
            query: null
        },
        {
            path: '/animation',
            name: 'Animation',
            component: Animation,
            query: null
        }
    ]
})
