<template>
  <div>
    <my-menu></my-menu>
    <div class="login-page">
      <div class="form">
        <form class="login-form">
          <input type="text" placeholder="نام کاربری" v-model="username" />
          <input type="password" placeholder="رمز عبور" v-model="password" />
          <p v-if="checkError">رمز عبور یا نام کاربری صحیح نمی باشد </p>
          <button @click.prevent="submitted">ورود</button>
        </form>
        <p class="message">
          ثبت نام نکردید؟
          <router-link to="/signup">ثبت نام</router-link>
        </p>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    submitted() {
      const formData = {
        username: this.username,
        password: this.password
      };
      console.log(formData);
      this.$store.dispatch("login", formData);
    }
  },
  computed:{
    checkError(){
      return this.$store.getters.loginError
    }
  },
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);
.login-page {
  width: 360px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 360px;
  margin: 0 auto 100px;
  padding: 45px;
  text-align: center;
  box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);
}
.form input {
  font-family: "Roboto", sans-serif;
  outline: 0;
  background: #f2f2f2;
  width: 100%;
  border: 0;
  margin: 0 0 15px;
  padding: 15px;
  box-sizing: border-box;
  font-size: 14px;
  text-align: right;
}
.form button {
  font-family: "Roboto", sans-serif;
  text-transform: uppercase;
  outline: 0;
  background: #2398d4;
  width: 100%;
  border: 0;
  padding: 15px;
  color: #ffffff;
  font-size: 14px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;
}
.form button:hover,
.form button:active,
.form button:focus {
  background: #0886c7;
}
.form .message {
  margin: 15px 0 0;
  color: #b3b3b3;
  font-size: 12px;
}
.form .message a {
  color: #2398d4;
  text-decoration: none;
}
</style>
