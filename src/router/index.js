import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import show from '@/view/show'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'show',
      component: show
    }
  ]
})
