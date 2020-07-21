<template>
  <div class="container pt-3 my-3">
    <ul class="nav nav-pills" role="tablist">
      <li class="nav-item">
        <a class="nav-link active" data-toggle="pill" href="#profile">پروفایل کاربری</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#blits">بلیط ها</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" data-toggle="pill" href="#gheire">غیره</a>
      </li>
    </ul>
    <div class="tab-content">
      <div class="container tab-pane active pt-3 my-3 border" id="profile">
        <h4>پروفایل کابری</h4>
        <br />
        <div class="row">
          <div class="col">
            <div class="form-group">
              <label>نام</label>
              <input type="text" class="form-control" v-model="information.first_name" />
            </div>
            <div class="form-group">
              <label>نام خانوادگی</label>
              <input type="text" class="form-control" v-model="information.last_name" />
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>ایمیل</label>
                  <input type="text" class="form-control" v-model="information.email" disabled />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>نام کاربری</label>
                  <input type="text" class="form-control" v-model="information.username" disabled />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>تاریخ تولد</label>
                  <datetime
                    type="datetime"
                    input-class="form-control "
                    format="yyyy-MM-dd'T'HH:mm:ss'Z'"
                    v-model="information.birth_day"
                  ></datetime>
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>آدرس</label>
                  <input type="text" class="form-control" v-model="information.address" />
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>شماره تلفن</label>
                  <input type="number" class="form-control" v-model="information.phone" disabled />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>شهر</label>
                  <select class="form-control" v-model="information.city_name">
                    <option
                      v-for="(item ,key) in this.$store.getters.getCityEvent"
                      :key="key"
                    >{{key}}</option>
                  </select>
                </div>
              </div>
            </div>
            <h6>تغییر رمز عبور</h6>
            <div class="row">
              <div class="col">
                <div class="form-group">
                  <label>رمز عبور فعلی</label>
                  <input type="password" class="form-control" placeholder="******" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>رمز عبور جدید</label>
                  <input type="password" class="form-control" />
                </div>
              </div>
              <div class="col">
                <div class="form-group">
                  <label>تکرار رمز عبور</label>
                  <input type="password" class="form-control" />
                </div>
              </div>
            </div>
          </div>
          <div class="col-sm-3">
            <img :src="information.image" class="float-right" width="200" height="200" />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <input type="file" class="form-control-file" ref="file"  @change="uploadImg" />
          </div>
        </div>
      </div>
      <div class="container tab-pane fade pt-3 my-3 border" id="blits">
        <h4>بلیط های خریداری شد</h4>
        <br />
      </div>
      <div class="container tab-pane fade pt-3 my-3 border" id="gheire">
        <h4>غیره</h4>
        <br />
      </div>
    </div>
    <button class="btn btn-primary" @click="editProfile">submit</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        cityArray: [],
        image: ""
      },
      information: {
        username: "",
        email: "",
        phone: "",
        image: "",
        first_name: "",
        last_name: "",
        birth_day: "",
        city_name: "",
        address: "",
        password: "",
        new_password: ""
      }
    };
  },
  beforeRouteEnter: function(to, from, next) {
    next(vm => {
      axios
        .get("http://localhost:8000/auth/profile/", {
          headers: {
            Authorization: "Token " + vm.getAuth()
          }
        })
        .then(res => {
          console.log("resultProfile", res);
          vm.setInfo(res);
        })
        .catch(error => {
          console.log("errorProfile", error);
        });
    });
  },
  methods: {
    setInfo: function(res) {
      this.information.username = res.data.username;
      this.information.email = res.data.email;
      this.information.phone = res.data.phone;
      this.information.image = res.data.image;
      this.information.first_name = res.data.first_name;
      this.information.last_name = res.data.last_name;
      this.information.birth_day = res.data.birth_day;
      this.information.city_name = res.data.city_name;
      this.information.address = res.data.address;
      console.log("infoProfile", this.information);
      console.log("cityType", this.$store.getters.getCityEvent);
      for (let key in this.$store.getters.getCityEvent) {
        this.formData.cityArray.push(this.$store.getters.getCityEvent[key]);
      }
      console.log("cityArray", this.formData.cityArray);
    },
    getAuth: function() {
      console.log("tokeInProfile", this.$store.getters.getToken);
      return this.$store.getters.getToken;
    },
    editProfile: function() {
      console.log("infoo",this.information)
      let sendData = new FormData();
      sendData.append("first_name", this.information.first_name);
      sendData.append("last_name", this.information.last_name);
      console.log("city",this.$store.getters.getCityEvent[this.information.city_name])
      sendData.append(
        "city",
        this.$store.getters.getCityEvent[this.information.city_name]
      );
      sendData.append("address", this.information.address);
      sendData.append("birth_day", this.information.birth_day);
      if(this.information.password!=""){
          sendData.append("password", this.information.password);
      }
      if(this.information.new_password!=""){
          sendData.append("new_password", this.information.new_password);
      }
      sendData.append("image", this.formData.image);
      axios
        .patch("http://localhost:8000/auth/profile/", sendData, {
          headers: {
            Authorization: "Token " + this.$store.getters.getToken,
            "Content-Type": "multipart/form-data"
          }
        })
        .then(res => {
          console.log("success to patch data to server",res);
          this.$router.push("/")
        })
        .catch(error => {
          console.log("fail to patch data to server",error.response);
        });
    },
    uploadImg: function(e) {
      this.formData.image = this.$refs.file.files[0];
      const file = e.target.files[0];
      this.information.image = URL.createObjectURL(file);
      console.log("urlImg", this.information.image);
    }
  }
};
</script>

<style scoped>
</style>