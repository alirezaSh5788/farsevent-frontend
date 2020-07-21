import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router';
import Vuelidate from 'vuelidate';
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import Menu from "./components/home/Menu.vue"
import Footer from "./components/home/Footer.vue"

Vue.use(Datetime)
Vue.use(Vuelidate);
Vue.component('datetime', Datetime);
Vue.component('my-menu', Menu)
Vue.component('my-footer',Footer)
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
