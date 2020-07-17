import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import router from './router';
import Vuelidate from 'vuelidate';
import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'
import { VueperSlides, VueperSlide } from "vueperslides";
import "vueperslides/dist/vueperslides.css";

Vue.use(Datetime)
Vue.use(Vuelidate);
Vue.component('datetime', Datetime);
Vue.component("vueper", VueperSlides);
new Vue({
  el: "#app",
  store,
  router,
  render: h => h(App)
});
