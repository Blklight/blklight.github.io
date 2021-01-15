export const state = () => ({
  isDark: loadState("darkMode") || true,
});

export const mutations = {
  darkMode(state) {
    state.isDark = !state.isDark;
    localStorage.setItem("darkMode", JSON.stringify(state.isDark));
  },
};

export const getters = {
  isDarkMode(state) {
    return state.isDark;
  },
};

function loadState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return true;
  }
}
