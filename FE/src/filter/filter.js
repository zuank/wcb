export function popupShow(commit) {
  commit('UPDATE_POPUP_SHOW', true)
  setTimeout(() => {
      commit('UPDATE_POPUP_SHOW', false)
  }, 2000);
}