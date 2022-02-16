export const state = () => ({
  isDark: loadState("darkTheme") || false,
});

export const mutations = {
  darkTheme(state) {
    state.isDark = !state.isDark;
    localStorage.setItem("darkTheme", JSON.stringify(state.isDark));
  },
};

export const getters = {
  isDarkTheme(state) {
    return state.isDark;
  },
};

function loadState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return false;
  }
}
