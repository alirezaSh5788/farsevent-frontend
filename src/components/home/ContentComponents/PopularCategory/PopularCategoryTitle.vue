<template>
  <div class="trending-category d-flex">
    <h3 class="ml-3"> دسته بندی ها</h3>
    <a href="#" class="mt-2">مشاهده ی همه</a>
  </div>
</template>
<script>
export default {
  data(){
    return{

    }
  },
  methods:{
    go (){
      this.$router.push("/allEvent")
    }
  }
};
</script>
<style scoped>
</style>