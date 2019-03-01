import Vue from 'vue';
import Vuex from 'vuex';
import * as Login from './actions/Login'

Vue.use(Vuex);
export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',

  state: {
    user:{}
  },
  getters: {

  },
  actions: {
    ...Login
  },
  mutations: {
    'UPDATE_USER_INFO' (state, info) {
      state.user = info;
    }
  }
});
