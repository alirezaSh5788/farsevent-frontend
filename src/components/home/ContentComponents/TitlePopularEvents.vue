<template>
  <div class="trendin-week d-flex">
    <h3 class="ml-3">رویدادهای ثبت شده</h3>
    <a href="#" class="mt-2" @click="toAllEvent()">مشاهده ی همه</a>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    toAllEvent(){
      this.$router.push("/allEvent")
    }
  }
};
</script>
<style scoped>
</style>