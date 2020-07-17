import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router';
import Vuelidate from 'vuelidate';
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

Vue.use(Datetime)
Vue.use(Vuelidate);
Vue.component('datetime', Datetime);
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
