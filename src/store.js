import Vue from 'vue';
import Vuex from 'vuex';
import api from './api';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem('user')),
  },
  getters: {
    currentUserId(state) {
      return state.user && state.user.id;
    },
    currentUser(state) {
      return state.user && state.user.username;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },
    clearUser(state) {
      state.user = null;
      localStorage.removeItem('user');
    },
  },
  actions: {
    signUp({ commit }, { username, password }) {
      // The Promise used for router redirect in Signup.vue
      return new Promise((resolve, reject) => {
        api
          .createUser(username, password)
          .then((response) => {
            commit('setUser', response.data);
            resolve();
          })
          .catch((error) => {
            commit('clearUser');
            // reject(response.body.errors);
            reject(error.response.data.errors);
          });
      });
    },
    signIn({ commit }, { username, password }) {
      // The Promise used for router redirect in Signin.vue
      return new Promise((resolve, reject) => {
        api
          .createSession(username, password)
          .then((response) => {
            commit('setUser', response.data);
            resolve();
          })
          .catch((error) => {
            commit('clearUser');
            // reject(response.body.error);
            reject(error.response.data.error);
          });
      });
    },
    signOut({ commit }) {
      // The Promise used for router redirect in TheHeader.vue
      return new Promise((resolve) => {
        api.deleteSession().then(() => {
          commit('clearUser');
          resolve();
        });
      });
    },
  },
});
