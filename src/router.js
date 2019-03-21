import Vue from 'vue';
import Router from 'vue-router';
import Signup from '@/views/Signup.vue';
import Signin from '@/views/Signin.vue';
import Rooms from '@/views/Rooms.vue';
import Room from '@/views/Room.vue';
import store from './store';

Vue.use(Router);

function requireAuth(to, from, next) {
  if (store.getters.currentUser) {
    next();
  } else {
    next({
      path: '/',
      query: { redirect: to.fullPath },
    });
  }
}

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      component: Signin,
    },
    {
      path: '/sign-up',
      component: Signup,
    },
    {
      path: '/rooms',
      name: 'Rooms',
      component: Rooms,
      beforeEnter: requireAuth,
    },
    {
      path: '/rooms/:id',
      name: 'Room',
      component: Room,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: '*',
      redirect: '/',
    },
  ],
});
