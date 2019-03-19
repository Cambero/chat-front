import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: localStorage.getItem('user'),
  },
  getters: {
    currentUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', user);
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  actions: {
    signup({ commit }, { user }) {
      commit('setUser', user);
    },
    signout({ commit }) {
      commit('clearUser');
    },
  },
});
