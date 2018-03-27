import Vue from 'vue'
/*global Vue*/
import Router from 'vue-router'
import Index from '@/index/index.vue'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    }
  ]
})
