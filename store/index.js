export const state = () => ({
  isDark: loadState("darkTheme") || true,
  isOpen: loadSidebarState("sidebarSwitch") || false,
});

export const mutations = {
  darkTheme(state) {
    state.isDark = !state.isDark;
    localStorage.setItem("darkTheme", JSON.stringify(state.isDark));
  },

  sidebarSwitch(state) {
    state.isOpen = !state.isOpen;
    localStorage.setItem("sidebarSwitch", JSON.stringify(state.isOpen));
  },
};

export const getters = {
  isDarkTheme(state) {
    return state.isDark;
  },

  isSidebarOpen(state) {
    return state.isOpen;
  },
};

function loadState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return true;
  }
}

function loadSidebarState(key) {
  try {
    return JSON.parse(window.localStorage.getItem(key));
  } catch (err) {
    return false;
  }
}
