<template>
  <div class="container row my-5">
    <!--<div class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4">
      <ul>
        --<app-popular-event-table-row></app-popular-event-table-row>
        <app-popular-event-table-row></app-popular-event-table-row>
        <li class="d-flex align-items-center trending-table mt-3" v-for="index in 2" :key="index">
          <p class="w-25">12 خرداد</p>
          <div class="d-flex flex-column">
            <a href="#">
              <h3>{{title(index)}}</h3>
            </a>
            <div class="d-flex justify-content-start">
              <p class="ml-2">آنلاین</p>
              <span class="ml-2">-</span>
              <span>تا 15 خرداد</span>
            </div>
          </div>
        </li>
      </ul>
    </div>-->
    <!--<app-event-card></app-event-card>
    <app-event-card></app-event-card>-->
    <div
      class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"
      v-for="index in 3"
      :key="index"
    >
      <div class="card text-right tranding-card">
        <img class="card-img-top" :src="img(index)" alt />
        <div class="card-body">
          <h4 class="card-title">{{title(index)}}</h4>
          <div
            class="card-text d-flex justify-content-between align-items-center"
          >
            <button class="btn">ثبت نام</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    img(idx){
      return this.$store.getters.getEvent[idx].image
    },
    title(idx){
      return this.$store.getters.getEvent[idx].title
    }
  }
};
</script>
<style scoped></style>
