<template>
  <div class="container row my-5">
    <div
      class="col-12 col-xs-12 col-sm-12 col-md-12 col-lg-4 col-xl-4"
      v-for="index in 3"
      :key="index"
    >
      <div class="card text-right tranding-card">
        <img class="card-img-top" :src="img(index)" height="200px" alt />
        <div class="card-body">
          <h4 class="card-title">{{title(index)}}</h4>
          <div
            class="card-text d-flex justify-content-between align-items-center"
          >
            <button class="btn" @click="go(index)">ثبت نام</button>
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
    },
    go(idx){
      this.$router.push("/buyTicket/"+this.$store.getters.getEvent[idx].id)
    }
  }
};
</script>
<style scoped></style>
