<template>
  <div>
    <my-menu></my-menu>
    <div class="container pt-0 pb-5">
      <h4 class="mb-4">رویداد</h4>
      <div class>
        <div class="row">
          <div class="col-6">
            <img :src="showEvent.myImage" class="my-img" width="100%" />
          </div>
          <div class="col-6 discription">
            <h3>توضیحات</h3>
            <p>{{showEvent.myDescription}}</p>
          </div>
          <div class="about-tic d-flex flex-row mt-4 mr-4">
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2">عنوان رویداد :</p>
              <span>{{showEvent.myTitle}}</span>
            </div>
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2">شروع :</p>
              <span>{{showEvent.myStart_time}}</span>
            </div>
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2">پایان :</p>
              <span>{{showEvent.myEnd_time}}</span>
            </div>
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2">موضوع :</p>
              <span>{{showEvent.myEvent_category}}</span>
            </div>
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2">شهر :</p>
              <span>{{showEvent.myCity}}</span>
            </div>
          </div>
          <div class="about-tic d-flex flex-row mt-4 mr-4">
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2"> نوع رویداد :</p>
              <span>{{showEvent.myEvent_type}}</span>
            </div>
            <div class="about-tic-test d-flex justify-content-center ml-5">
              <p class="ml-2">آدرس رویداد :</p>
              <span>{{showEvent.myAddress}}</span>
            </div>
          </div>
        </div>
        <div class="container p-3 my-3 bg-dark text-white"
        v-for="index in search.numberTicket" :key="index"
         id="blit">
         <p>{{index}}</p>
          <div class="container-fluid">
            <div class="row">
              <div class="col-3">
                <h6>عنوان بلیط</h6>
              </div>
              <div class="col-2">
                <h6>مهلت ثبت نام</h6>
              </div>
              <div class="col-2">
                <h6>قیمت</h6>
              </div>
              <div class="col-2">
                <h6>تعداد باقی مانده</h6>
              </div>
            </div>
          </div>
          <div class="container-fluid bg-light text-dark p-3 my-3">
            <div class="row">
              <div class="col-3">
                <p>{{showEvent.myTickets[index-1].title}}</p>
              </div>
              <div class="col-2">
                <p>{{showEvent.myStart_time}}</p>
              </div>
              <div class="col-2">
                <p>{{showEvent.myTickets[index-1].price}}</p>
              </div>
              <div class="col-2">
                <input class="form-control" type="number" id="tedad"
                 v-model="showEvent.myTickets[index-1].capacity"  disabled/>
              </div>
              <div class="col text-left">
                <button type="button" class="btn my-btn" @click="onSubmit(index)">ثبت بلیط</button>
              </div>
              <div class="col-12">
                <input class="form-control" type="text" id="tedad"
                v-model="showEvent.myTickets[index-1].description"  disabled/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <my-footer></my-footer>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      showEvent: {
        myId: "",
        myTitle: "",
        myImage: "",
        myDescription: "",
        myStart_time: "",
        myEnd_time: "",
        myTags: "",
        myEvent_type: "",
        myEvent_category: "",
        myCity: "",
        myAddress: "",
        myTickets: []
      },
      search: {
        type: [],
        category: [],
        city: [],
        numberTicket: 0
      }
    };
  },
  beforeRouteEnter: function(to, from, next) {
    function getInfoEvent() {
      return axios.get(
        "http://localhost:8000/event/event/".concat(to.params.id),
        {
          responseType: "json"
        }
      );
    }
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
    axios
      .all([getInfoEvent(), getEventTtpe(), getEventCategory(), getEventCity()])
      .then(
        axios.spread(function(info, type, category, city) {
          next(vm => {
            vm.setType(type);
            vm.setCategory(category);
            vm.setCity(city);
            vm.setInfo(info);
          });
        })
      );
  },
  methods: {
    setInfo: function(response) {
      console.log("enterToPage", response);
      this.showEvent.myId = response.data.id;
      this.showEvent.myTitle = response.data.title;
      this.showEvent.myImage = response.data.image;
      this.showEvent.myDescription = response.data.description;
      this.showEvent.myStart_time = response.data.start_time;
      this.showEvent.myEnd_time = response.data.end_time;
      this.showEvent.myTags = response.data.tags;
      this.showEvent.myEvent_type = response.data.event_type;
      this.showEvent.myEvent_category = response.data.event_category;
      this.showEvent.myCity = response.data.city;
      this.showEvent.myAddress = response.data.address;
      for (let key in response.data.tickets) {
        this.showEvent.myTickets.push(response.data.tickets[key]);
      }
      console.log("ticket",this.showEvent.myTickets)
      console.log("111", this.search.type);
      for (let key in this.search.type) {
        if (response.data.event_type == this.search.type[key].id) {
          this.showEvent.myEvent_type = this.search.type[key].name;
          break;
        }
      }
      for (let key in this.search.category) {
        if (response.data.event_category == this.search.category[key].id) {
          this.showEvent.myEvent_category = this.search.category[key].name;
          break;
        }
      }
      for (let key in this.search.city) {
        if (response.data.city == this.search.city[key].id) {
          this.showEvent.myCity = this.search.city[key].name;
          break;
        }
      }
      this.search.numberTicket = this.showEvent.myTickets.length;
      console.log("len", this.search.numberTicket);
      console.log("infooo", this.showEvent);
    },
    setType: function(response) {
      console.log("infoType", response);
      for (let key in response.data) {
        this.search.type.push(response.data[key]);
      }
      console.log("infoType1", this.search.type);
    },
    setCategory: function(response) {
      console.log("infoCategory", response);
      for (let key in response.data) {
        this.search.category.push(response.data[key]);
      }
      console.log("infoCategory1", this.search.category);
    },
    setCity: function(response) {
      console.log("infoCity", response);
      for (let key in response.data) {
        this.search.city.push(response.data[key]);
      }
      console.log("infoCity", this.search.city);
    },
    onSubmit: function(idx) {
      let idTicket = {
        ticket: this.showEvent.myTickets[idx - 1].id,
        token: this.$store.getters.getToken
      };
      this.$store.dispatch("register", idTicket);
    }
  }
};
</script>
<style scoped>
body {
  direction: rtl;
  text-align: right;
}
.my-img {
  width: 90%;
}
.discription h3 {
  font-size: 1.5rem;
  font-weight: 700;
  color: #4531ba;
  margin: 2rem 0 1rem;
}
.discription p {
  font-size: 1rem;
  text-align: justify;
  color: #444;
}
.my-btn {
  color: #fff;
  background-color: #4531ba;
  border: 0.1rem solid #4531ba;
}
.my-btn:hover {
  color: #4531ba;
  background-color: #fff;
  border: 0.1rem solid #4531ba;
}
.container-fluid input:focus {
  border-color: #ff7840;
  box-shadow: none;
}
</style>