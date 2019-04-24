import Vue from 'vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import { sync } from 'vuex-router-sync'
import 'muse-ui/dist/muse-ui.css'
import theme from 'muse-ui/lib/theme'
import toast from 'muse-ui-toast'
import axios from './utils/axios'
import './assets/css/common.css'

toast.config({
  position: 'top', // 弹出的位置
  time: 2000, // 显示的时长
  closeIcon: 'close', // 关闭的图标
  close: true, // 是否显示关闭按钮
  successIcon: 'check_circle', // 成功信息图标
  infoIcon: 'info', // 信息信息图标
  warningIcon: 'priority_high', // 提醒信息图标
  errorIcon: 'warning' // 错误信息图标
})

Vue.prototype.$http = axios
Vue.prototype.$toast = toast

theme.use('light')
Vue.use(MuseUI)
sync(store, router)
Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  router,
  store
}).$mount('#app')
