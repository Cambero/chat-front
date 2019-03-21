import Vue from 'vue';
import Vuex from 'vuex';

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
        Vue.http.post(
          'http://localhost:3000/users',
          { username, password },
        ).then(
          (response) => {
            commit('setUser', response.data);
            resolve();
          },
          (response) => {
            commit('clearUser');
            reject(response.body.errors);
          },
        );
      });
    },
    signIn({ commit }, { username, password }) {
      // The Promise used for router redirect in Signin.vue
      return new Promise((resolve, reject) => {
        Vue.http.post(
          'http://localhost:3000/session',
          { username, password },
        ).then(
          (response) => {
            commit('setUser', response.data);
            resolve();
          },
          (response) => {
            commit('clearUser');
            reject(response.body.error);
          },
        );
      });
    },
    signOut({ commit }) {
      // The Promise used for router redirect in TheHeader.vue
      return new Promise((resolve) => {
        Vue.http.delete(
          'http://localhost:3000/session',
        ).then(
          () => {
            commit('clearUser');
            resolve();
          },
        );
      });
    },
  },
});
