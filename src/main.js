import Vue from 'vue'
import App from './App.vue'

import Beufy from 'buefy'
import 'buefy/dist/buefy.css'
import VueMeta from 'vue-meta'

import './scss/custom.scss';
import '@mdi/font/css/materialdesignicons.css';

Vue.use(VueMeta);
Vue.use(Beufy);
Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
