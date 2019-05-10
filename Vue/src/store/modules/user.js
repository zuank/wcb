export default {
    state: {
        userName: ''
    },
    mutations: {
        'UPDATE_USER_NAME' (state, bol) {
            state.userName = bol;
        }
    }
};
