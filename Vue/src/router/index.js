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
        component: () => import('@/page/Login')
      }, {
        path:'publishedList',
        name: 'publishedList',
        component: () => import('@/page/List')
      }, {
        path:'newJourney',
        name: 'newJourney',
        component: () => import('@/page/JourneyEdit')
      }, {
        path:'journeyEdit/:id',
        name: 'JourneyEdit',
        component: () => import('@/page/JourneyEdit')
      }, {
        path:'journeyInfo/:id',
        name: 'JourneyInfo',
        component: () => import('@/page/JourneyInfo')
      }]
    }
  ]
})
