
import Vue from 'vue'
import router from './router'
import store from './store'
import MuseUI from 'muse-ui'
import { sync } from 'vuex-router-sync'
import 'muse-ui/dist/muse-ui.css'
import axios from 'axios'

Vue.prototype.$http = axios
Vue.use(MuseUI)
sync(store, router)
Vue.config.productionTip = false
/* eslint-disable no-new */
export default new Vue({
  router,
  store
}).$mount('#app')