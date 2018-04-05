export default {
  state: {
    popupText: '',
    popupShow: false
  },
  mutations: {
    'UPDATE_POPUP_TEXT' (state, text) {
      state.popupText = text;
    },
    'UPDATE_POPUP_SHOW' (state, bol) {
      state.popupShow = bol;
    }
  }
};