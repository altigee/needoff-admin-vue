import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: {},
    access_token: localStorage.getItem("access_token")
  },
  getters: {
    is_logged_in: state => !!state.access_token
  },
  mutations: {
    SET_ACCESS_TOKEN: (state, token) => {
      state.access_token = token;
    },
    SET_CURRENT_USER: (state, user) => {
      state.user = user;
    }
  },
  actions: {
    loginUser({ commit }, token) {
      localStorage.setItem("access_token", token);
      commit("SET_ACCESS_TOKEN", token);
    },
    logoutUser({ commit }) {
      localStorage.removeItem("access_token");
      commit("SET_ACCESS_TOKEN", "");
    },
    setCurrentUser({ commit }, user) {
      commit("SET_CURRENT_USER", user);
    }
  }
});
