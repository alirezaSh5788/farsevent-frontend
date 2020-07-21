<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light my-container">
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item" v-if="this.$store.getters.getToken!=null?false:true">
            <router-link class="nav-link" to="./login">
              ورود
              <span class="sr-only">(current)</span>
            </router-link>
          </li>
          <li class="nav-item" v-if="this.$store.getters.getToken!=null?false:true">
            <router-link class="nav-link" to="/signUp">عضویت</router-link>
          </li>
          <li class="nav-item" v-if="this.$store.getters.getToken==null?false:true">
            <router-link class="nav-link" to="/profile">پروفایل کاربری</router-link>
          </li>
          <li class="nav-item mr-4 active">
            <router-link class="nav-link" to="/createEvent">ایجاد رویداد</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="./allEvent">رویداد ها</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">راهنما</a>
          </li>
          <li class="nav-item" v-if="this.$store.getters.getToken==null?false:true">
            <a class="nav-link" href="#" @click="leaveAccount">خروج</a>
          </li>
        </ul>
      </div>
      <form class="form-inline d-flex flex-row-reverse border ml-4 pr-0 my-form">
        <i class="fas fa-search" aria-hidden="true"></i>
        <input
          class="form-control form-control-sm ml-3 w-75 border-none p-0"
          type="text"
          placeholder="جستجو"
          aria-label="Search"
        />
      </form>
      <a class="navbar-brand" href="#">FARSI-EVAND</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
    </nav>
    <hr>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    checkAuth: function() {
      if (this.$store.getters.getToken != null) {
        return true;
      }
      return true;
    },
    leaveAccount: function() {
      this.$store.commit("clearToken");
      this.$store.commit("leave");
      //console.log("checkes",this.$store.getters.getToken)
    }
  }
};
</script>
<style scoped>
</style>
