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
      redirect: '/login',
      children: [{
        path: 'login',
        name: 'Login',
        component: () => import('@/page/login'),
        meta:{
          title:'登陆',
          show: false,
          needLogin: false
        }
      }, {
        path: 'journey-list',
        name: 'JourneyList',
        component: () => import('@/page/journey-list'),
        meta:{
          title:'广场',
          show: true,
          needLogin: false,
          icon: 'inbox'
        }
      }, {
        path: 'joined-list',
        name: 'JoinedList',
        component: () => import('@/page/journey-list'),
        meta:{
          title:'我参加的',
          show: true,
          needLogin: true,
          icon: 'inbox'
        }
      }, {
        path: 'published-list',
        name: 'PublishedList',
        component: () => import('@/page/journey-list'),
        meta:{
          title:'我发布的',
          show: true,
          needLogin: true,
          icon: 'send'
        }
      }, {
        path: 'journey-add',
        name: 'journeyAdd',
        component: () => import('@/page/journey-edit'),
        meta:{
          title:'发布行程',
          show: true,
          needLogin: true,
          icon: 'send'
        }
      }, {
        path: 'journey-update/:id',
        name: 'journeyUpdate',
        component: () => import('@/page/journey-edit'),
        meta:{
          title:'修改行程',
          show: false,
          needLogin: true
        }
      }, {
        path: 'journey-info/:id',
        name: 'JourneyInfo',
        component: () => import('@/page/journey-info'),
        meta:{
          title:'行程详情',
          show: false,
          needLogin: true
        }
      }]
    }
  ]
})
