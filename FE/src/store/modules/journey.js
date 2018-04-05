export default {
  state: {
    publishedList: []
  },
  mutations: {
    'UPDATE_PUBLISHED_LIST' (state, list) {
      state.publishedList = list;
    },
    'UPDATE_POPUP_SHOW' (state, bol) {
      state.popupShow = bol;
    }
  }
};