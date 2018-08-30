import Vue from 'vue';
import Vuex from 'vuex';
import * as Login from './actions/Login'
import * as Journey from './actions/Journey'
import popup from './modules/popup'
import user from './modules/user'
import journey from './modules/journey'

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  modules: {
    popup,
    user,
    journey
  },
  getters: {

  },
  actions: {
    ...Login,
    ...Journey
  }
});
