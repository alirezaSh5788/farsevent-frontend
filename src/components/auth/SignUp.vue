<template>
  <div>
    <my-menu></my-menu>
    <div class="login-page">
      <div class="form">
        <form class="register-form">
          <input type="text" placeholder="نام کاربری" v-model="username" />
          <input type="password" placeholder="رمز عبور" v-model="password"/>
          <input type="password"
          placeholder="تکرار رمز عبور" v-model="newPassword"  />
          <input
            type="text"
            placeholder="ایمیل"
            v-model="email"
          />
          <input type="text" placeholder="تلفن " v-model="phone" />
          <input type="text" placeholder="نام" v-model="firstName" />
          <input type="text" placeholder="نام خانوادگی" v-model="lastName" />
          <button @click.prevent="submitted()">ثبت نام</button>
          <p class="message">
            قبلاً ثبت نام کرده اید؟
            <router-link to="/login">ورود</router-link>
          </p>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import {
  required,
  email,
  password,
  sameAs,
  minLength,
  maxLength
} from "vuelidate/lib/validators";
export default {
  data() {
    return {
      username: "",
      password: "",
      email: "",
      phone: "",
      firstName: "",
      lastName: "",
      newPassword:""
    };
  },
  methods: {
    submitted() {
      const formData = {
        username: this.username,
        password: this.password,
        email: this.email,
        phone: this.phone,
        firstName: this.firstName,
        lastName: this.lastName,
      };
      console.log(formData);
      this.$store.dispatch("signup", formData);
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    },
    repeatPassword: {
      required,
      sameAsPassword: sameAs("password")
    },
    username: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(150)
    },
    firstName: {
      minLength: minLength(4)
    },
    lastName: {
      minLength:minLength(4)
    }
  }
};
</script>
<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:300);

.login-page {
  width: 500px;
  padding: 8% 0 0;
  margin: auto;
}
.form {
  position: relative;
  z-index: 1;
  background: #ffffff;
  max-width: 500px;
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
  text-align: center;
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
.container {
  position: relative;
  z-index: 1;
  max-width: 300px;
  margin: 0 auto;
}
.container:before,
.container:after {
  content: "";
  display: block;
  clear: both;
}
.container .info {
  margin: 50px auto;
  text-align: center;
}
.container .info h1 {
  margin: 0 0 15px;
  padding: 0;
  font-size: 36px;
  font-weight: 300;
  color: #1a1a1a;
}
.container .info span {
  color: #4d4d4d;
  font-size: 12px;
}
.container .info span a {
  color: #000000;
  text-decoration: none;
}
.container .info span .fa {
  color: #ef3b3a;
}
.form .invalid {
  -webkit-transition: all 0.3s ease-in-out !important;
  transition: all 0.3s ease-in-out !important;
  border: 0.2rem solid #d40c0c !important;
  box-shadow: none !important;
}
</style>
