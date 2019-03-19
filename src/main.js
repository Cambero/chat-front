import Vue from 'vue';
import BootstrapVue from 'bootstrap-vue';
import vueResource from 'vue-resource';
import router from './router';
import store from './store';
import App from './App.vue';

Vue.use(vueResource);
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
