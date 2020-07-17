<template>
  <div class="create-form-event">
    <div class="container-fluid m-0 p-0">
      <form action="/action_page.php" class="needs-validation" novalidate>
        <div class="form-group" id="name">
          <div class="d-flex">
            <div class="pr-5 w-75 pt-5" id="moshakhasat">
              <h5 class="my-4">مشخصات رویداد</h5>
              <div class="d-flex">
                <label>نام رویداد :</label>
                <input
                  type="text"
                  class="form-control mr-2"
                  v-model="formData.eventName"
                  id="EName"
                  name="EName"
                  required
                />
              </div>
              <div class="invalid-feedback">لطفاً این قسمت را پر کنید</div>
              <div class="row">
                <div class="col">
                  <div class="form-group d-flex">
                    <label for="sel1">نوع رویداد :</label>
                    <select
                      class="form-control"
                      id="sel1"
                      placeholder="نوع رویداد"
                      v-model="formData.eventType"
                    >
                      <option
                        v-for="item in information.type"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group d-flex">
                    <label for="sel2">موضوع رویداد :</label>
                    <select
                      class="form-control"
                      id="sel2"
                      placeholder="موضوع رویداد"
                      v-model="formData.eventCategory"
                    >
                      <option
                        v-for="item in information.category"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</option>
                    </select>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col">
                  <div class="form-group d-flex">
                    <label for="sel1">شهررویداد :</label>
                    <select class="form-control" id="sel1" v-model="formData.eventCity">
                      <option
                        v-for="item in information.city"
                        :key="item.id"
                        :value="item.id"
                      >{{ item.name }}</option>
                    </select>
                  </div>
                </div>
                <div class="col">
                  <div class="form-group d-flex">
                    <label for="sel2">آدرس رویداد :</label>
                    <input
                      type="text"
                      class="form-control"
                      id="EName"
                      name="EName"
                      v-model="formData.address"
                      required
                    />
                  </div>
                </div>
              </div>
              <div class="form-group" id="tarikh">
                <div class="row">
                  <div class="col d-flex">
                    <label>تاریخ و ساعت شروع رویداد :</label>
                    <!--<input type="text" class="date1 form-control" required />-->
                    <datetime
                      type="datetime"
                      input-class="form-control "
                      format="yyyy-MM-dd'T'hh:mm:ss'Z'"
                      v-model="formData.eventStartTime"
                    ></datetime>
                    <div class="invalid-feedback">لطفاً این قسمت را پر کنید</div>
                  </div>
                  <div class="col d-flex">
                    <label>تاریخ و ساعت پایان رویداد :</label>
                    <!--<input type="text" class="date1 form-control" required />-->
                    <datetime
                      type="datetime"
                      input-class="form-control "
                      format="yyyy-MM-dd'T'HH:mm:ss'Z'"
                      v-model="formData.eventEndTime"
                    ></datetime>
                    <div class="invalid-feedback">لطفاً این قسمت را پر کنید</div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <label>توضیحات :</label>
                <input
                  type="text"
                  class="form-control"
                  id="barchasb"
                  name="barchasb"
                  v-model="formData.description"
                />
              </div>
              <div class="d-flex">
                <label>برچسب ها :</label>
                <input
                  type="text"
                  class="form-control"
                  id="barchasb"
                  name="barchasb"
                  v-model="formData.tags"
                />
              </div>
              <div class="pt-3 my-3 text-center">
                <img
                  v-if="formData.urlImage"
                  :src="formData.urlImage"
                  class="img-responsive fit-image"
                  height="300"
                  alt="لطفا عکس رویداد مورد نظر آپلود کنید "
                />
                <div class="form-group pt-3 my-3">
                  <input
                    type="file"
                    class="form-control-file"
                    ref="file"
                    name="file"
                    @change="onFileChange"
                  />
                </div>
              </div>
            </div>
            <img src="img/icon.svg" class="w-50 mt-0 charector" alt />
          </div>
          <div class="mr-5">
            <div class="pt-3 my-3" id="blits">
              <h5>بلیط ها</h5>
              <div
                class="p-3 my-3 text-white"
                id="blit"
                v-for="index in information.idTicket"
                :key="index.id"
              >
                <div class="form-row">
                  <div class="col-sm-5">
                    <div class="form-group">
                      <label>عنوان بلیط</label>
                      <input
                        type="text"
                        class="form-control"
                        v-model="formData.ticket[index - 1].title"
                        placeholder="مثال: بلیط vip"
                        required
                      />
                      <div class="invalid-feedback pr-2 mt-2">لطفاً این قسمت را پر کنید</div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>تعداد</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model="formData.ticket[index - 1].capacity"
                        placeholder="تعداد"
                        required
                      />
                      <div class="invalid-feedback pr-2 mt-2">لطفاً این قسمت را پر کنید</div>
                    </div>
                  </div>
                  <div class="col-sm-3">
                    <div class="form-group">
                      <label>قیمت (تومان)</label>
                      <input
                        type="number"
                        class="form-control"
                        v-model="formData.ticket[index - 1].price"
                        placeholder="قیمت"
                        required
                      />
                      <div class="invalid-feedback">لطفاً این قسمت را پر کنید</div>
                    </div>
                  </div>
                  <div class="col-sm-1 text-center">
                    <button type="button" id="delete" class="btn btn-danger">X</button>
                  </div>
                </div>
                <div class="form-group">
                  <label>توضیحات</label>
                  <textarea
                    class="form-control"
                    rows="2"
                    id="comment"
                    v-model="formData.ticket[index - 1].description"
                    placeholder="توضیحات در مورد بلیط"
                  ></textarea>
                  <div class="invalid-feedback">لطفاً این قسمت را پر کنید</div>
                </div>
              </div>
              <div class="col text-center" id="blit-btn">
                <button type="button" class="btn btn-myprimary" @click="appendCode">اضافه کردن بلیط</button>
              </div>
            </div>
            <div class="form-group" id="sabt">
              <div class="form-check pt-3 my-3">
                <label class="form-check-label">
                  <input
                    type="checkbox"
                    class="form-check-input"
                    v-model="information.checkBoxTik"
                    value
                    required
                  />با قوانین فارسیونت موافقم
                  <div class="invalid-feedback">باید با قوانین سایت موافقت کنید</div>
                </label>
              </div>
              <button type="submit" class="btn btn-myprimary" @click.prevent="onSubmit">ثبت</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      formData: {
        eventName: "",
        eventType: "",
        eventCity: "",
        eventCategory: "",
        eventStartTime: "",
        eventEndTime: "",
        urlImage: null,
        tags: "",
        description: "",
        address: "",
        ticket: []
      },
      information: {
        checkBoxTik: "",
        urlImg: "",
        token: "",
        type: [],
        category: [],
        city: [],
        idTicket: 0
      }
    };
  },
  beforeRouteEnter: function(to, from, next) {
    function getEventTtpe() {
      return axios.get("http://localhost:8000/event/all-types/", {
        responseType: "json"
      });
    }
    function getEventCategory() {
      return axios.get("http://localhost:8000/event/all-categories/", {
        responseType: "json"
      });
    }
    function getEventCity() {
      return axios.get("http://localhost:8000/auth/all-cities", {
        responseType: "json"
      });
    }

    axios.all([getEventTtpe(), getEventCategory(), getEventCity()]).then(
      axios.spread(function(type, category, city) {
        next(vm => {
          vm.setType(type);
          vm.setCategory(category);
          vm.setCity(city);
          vm.setToken();
        });
      })
    );
  },
  methods: {
    setType: function(response) {
      this.formData.eventType = response.data[0].name;
      for (let key in response.data) {
        this.information.type.push(response.data[key]);
      }
      console.log("type", this.information.type);
    },
    setCategory: function(response) {
      this.formData.eventCategory = response.data[0].name;
      for (let key in response.data) {
        this.information.category.push(response.data[key]);
      }
      console.log("category", this.information.category);
    },
    setCity: function(response) {
      for (let key in response.data) {
        this.information.city.push(response.data[key]);
      }
      console.log("city", response.data);
    },
    setToken: function() {
      console.log("hamid konni");
      this.information.token = this.$store.getters.getToken;
      console.log("token", this.information.token);
    },
    appendCode: function() {
      var ticketInfo = {
        //id: this.information.idTicket,
        title: "",
        capacity: 0,
        price: 0,
        description: ""
      };
      this.formData.ticket.push(ticketInfo);
      console.log("arr", this.formData.ticket);
      this.information.idTicket++;
    },
    onSubmit() {
      let infoData = {
        title: this.formData.eventName,
        image: this.formData.urlImage,
        description: this.formData.description,
        start_time: this.formData.eventStartTime,
        end_time: this.formData.eventEndTime,
        tags: this.formData.tags,
        event_type: this.formData.eventType,
        event_category: this.formData.eventCategory,
        city: this.formData.eventCity,
        address: this.formData.address,
        tickets: this.formData.ticket
      };
      let sendData = new FormData();
      sendData.append("title", this.formData.eventName);
      sendData.append("image", this.information.urlImg);
      sendData.append("description", this.formData.description);
      sendData.append("start_time", this.formData.eventStartTime);
      sendData.append("end_time", this.formData.eventEndTime);
      sendData.append("tags", this.formData.tags);
      sendData.append("event_type", this.formData.eventType);
      sendData.append("event_category", this.formData.eventCategory);
      sendData.append("city", this.formData.eventCity);
      sendData.append("address", this.formData.address);
      for (var i = 0, valuePair; (valuePair = this.formData.ticket[i]); i++)
        for (var j in valuePair) sendData.append(j, valuePair[j]);
      
      console.log("jason",JSON.stringify( this.formData.ticket))
      console.log("infoData", infoData);
      console.log("formdatas", sendData);
      if (this.information.checkBoxTik == true) {
        console.log("kir", this.formData);
        console.log("toooken", this.information.token);
        axios
          .post("http://localhost:8000/event/create-event/", sendData, {
            headers: {
              Authorization: "Token " + this.information.token,
              "Content-Type": "multipart/form-data"
            }
          })
          .then(res => console.log(res))
          .catch(error => console.log("error", error.response));
      } else {
        console.log("kos");
      }
    },
    onFileChange(e) {
      const file = e.target.files[0];
      console.log("image", file);
      this.formData.urlImage = URL.createObjectURL(file);
      this.information.urlImg = this.$refs.file.files[0];
    }
  }
};
</script>
<style scoped>
h5 {
  color: #4531ba;
  font-weight: 700;
}
label {
  white-space: nowrap;
  padding: 0.375rem 0 0.375rem 0.75rem;
}
input,
textarea {
  -webkit-transition: all 0.3s ease-in-out !important;
  transition: all 0.3s ease-in-out !important;
}
input:focus,
textarea:focus {
  box-shadow: none !important;
  border: 0.2rem solid #ff7840 !important;
}

#blit {
  width: 95%;
  background-color: #4531ba;
}
.btn-myprimary {
  background-color: #4531ba;
  color: #fff;
}
.btn-myprimary:hover {
  border: 0.1rem solid #4531ba;
  color: #4531ba;
  background-color: #fff;
}
</style>
