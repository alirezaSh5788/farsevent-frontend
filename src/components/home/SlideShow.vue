<template>
  <div class="featured-events d-flex flex-column mt-5">
    <div class="row">
      <div
        class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-8 col-xl-8 mx-auto position-relative"
      >
        <img :src="img()" width="90%" height="400px" alt />
        <div class="register-event d-inline mx-5 my-3">
          <button class="btn" @click="showEvent()">ثبت نام</button>
          <div class="d-flex flex-column text-events">
            <h3>{{ title() }}</h3>
            <div class="d-flex justify-content-start">
              <p class="ml-3 mb-2">وبینار</p>
              <span class="ml-3 dat"></span>
              <span>مهندسی</span>
            </div>
            <p>رایگان</p>
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
    img:function(){
      return this.$store.getters.getEvent[0].image
    },
    title:function(){
      return this.$store.getters.getEvent[0].title
    },
    showEvent(){
      this.$router.push("/buyTicket/"+this.$store.getters.getEvent[0].id)
    }
  }
};
</script>
<style scoped></style>
