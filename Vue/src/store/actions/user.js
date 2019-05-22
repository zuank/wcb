import vm from '@/main'

export function getUserInfo({
    commit,
    dispatch
}, info) {
    vm.$http.get('/api/user/info').then(response => {
        if (response.data.status === 0){
            commit('UPDATE_USER_INFO', response.data.result);
        } else if(location.href.indexOf("/login")==-1) {
            window.location = '/';
        }
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
