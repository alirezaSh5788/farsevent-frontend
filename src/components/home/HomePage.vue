<template>
  <div class="container-fluid px-0">
    <app-menu></app-menu>
    <app-slide-show></app-slide-show>
    <app-content-events></app-content-events>
    <app-facilities></app-facilities>
    <app-footer></app-footer>
  </div>
</template>
<script>
import Menu from "./Menu.vue";
import SlideShow from "./SlideShow.vue";
import AppContentEvents from "./AppContentEvents";
import Facilities from "./Facilities";
import Footer from "./Footer";
export default {
  components: {
    appMenu: Menu,
    appSlideShow: SlideShow,
    appContentEvents: AppContentEvents,
    appFacilities: Facilities,
    appFooter: Footer
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      vm.send();
      vm.getTok();
    });
  },
  methods:{
    send:function(){
      this.$store.dispatch('loadDataOfHomePage')
    },
    getTok(){
      console.log("tokeen",this.$store.getters.getToken)
    }
  }
};
</script>
<style scoped>
.container-fluid {
  overflow: hidden;
}
</style>
