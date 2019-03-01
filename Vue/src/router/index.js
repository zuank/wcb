import Vue from 'vue'
import Router from 'vue-router'
import App from '@/APP'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: App,
      redirect:'/login',
      children:[{
        path: 'login',
        name: 'Login',
        component: () => import('@/page/login')
      }, {
        path:'journey-list',
        name: 'JourneyList',
        component: () => import('@/page/journey-list')
      }, {
        path:'journey-add',
        name: 'journeyAdd',
        component: () => import('@/page/journey-edit')
      }, {
        path:'journey-update/:id',
        name: 'journeyUpdate',
        component: () => import('@/page/journey-edit')
      }, {
        path:'journey-info/:id',
        name: 'JourneyInfo',
        component: () => import('@/page/journey-info')
      }]
    }
  ]
})
