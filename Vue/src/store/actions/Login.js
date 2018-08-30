import vm from '@/main'
import * as filter from '@/filter/filter.js'

export function login({
  commit,
  dispatch
}, info) {
  vm.$http.post('/api/login', info).then(response => {
    if (response.data.status === 0) {
      info.callback && info.callback(response)
      commit('UPDATE_POPUP_TEXT', '登录成功')
      filter.popupShow(commit)
    }

  }, response => {
    // error callback
  })
}

export function reg({
  commit,
  dispatch
}, info) {
  vm.$http.post('/api/reg', info).then(response => {
    console.log(response)
    if (response.data.status === 0) {
      info.callback && info.callback(response)
      commit('UPDATE_POPUP_TEXT', '注册成功')
      filter.popupShow(commit)
    }
  }, response => {
    // error callback
  })
}

export function getUserInfo({
  commit,
  dispatch
}, info) {
  vm.$http.get('/api/user/info').then(response => {

  }, response => {
  })
}

export function logout({
    commit,
    dispatch
  }, info) {
    vm.$http.get('/api/logout').then(response => {
  
    }, response => {
    })
  }