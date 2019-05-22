import Vue from 'vue';
import Vuex from 'vuex';
import * as User from './actions/user'

Vue.use(Vuex);
export default new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',

    state: {
        user:{}
    },
    getters: {

    },
    actions: {
        ...User
    },
    mutations: {
        'UPDATE_USER_INFO' (state, info) {
            state.user = info;
        }
    }
});
