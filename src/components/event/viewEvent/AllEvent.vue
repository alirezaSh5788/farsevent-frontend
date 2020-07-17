<template>
  <div class="show-events">
    <div class="container mt-5 px-0">
      <div class="d-flex flex-row-reverse">
        <div class="card w-35 mr-3">
          <img class :src="infoPage.eventList[0][0].image" alt="Card image" style="width:100%" />
          <h4 class="card-title mt-2 mx-2">{{infoPage.eventList[0][0].title}}</h4>
          <p class="card-text mx-2">توضیخات رویداد</p>
          <a href="#" class="btn card-btn">مشاهده</a>
        </div>
        <div class="search-box w-65 ml-5">
          <h3>جست وجوی رویداد</h3>
          <div class="form-group mb-4">
            <label for="EName">نام رویداد</label>
            <input type="text" class="form-control" id="EName" name="EName" 
            v-model="infoSearch.nameOfEvent" />
          </div>
          <div class="row">
            <div class="col mb-4">
              <div class="form-group">
                <label for="sel1">نوع رویداد</label>
                <select class="form-control" id="sel1"
                v-model="infoSearch.typeOfEvent">
                  <option v-for="item in loadDataSearch.type" :key="item.id">{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="col mb-4">
              <div class="form-group">
                <label for="sel2">موضوع رویداد</label>
                <select class="form-control" id="sel1"
                v-model="infoSearch.categoryOfEvent">
                  <option v-for="item in loadDataSearch.category" :key="item.id">{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="col mb-4">
              <div class="form-group">
                <label for="sel2">شهر</label>
                <select class="form-control" id="sel1" v-model="infoSearch.cityOfEvent">
                  <option v-for="item in loadDataSearch.city" :key="item.id">{{item.name}}</option>
                </select>
              </div>
            </div>
            <div class="col mb-4">
              <div class="form-group">
                <label for="sel2">مرتب سازی</label>
                <select class="form-control" id="sel1" v-model="infoSearch.sortOfEvent">
                  <option>حروف الفبا</option>
                </select>
              </div>
            </div>
          </div>
          <button type="submit" class="btn my-btn" @click="submitSearch">جست وجو</button>
        </div>
      </div>

      <div class="row mt-5" v-for="index in infoPage.numberRow" :key="index">
        <div class="col-12 col-xs-12 col-md-4" v-if="infoPage.viewBool[index-1][0]">
          <div class="card w-75">
            <img
              class
              :src="infoPage.eventList[index-1][0].image"
              alt="Card image"
              style="width:100%"
            />
            <h4 class="card-title mt-2 mx-2">{{infoPage.eventList[index-1][0].title}}</h4>
            <p class="card-text mx-2">توضیخات رویداد</p>
            <a class="btn card-btn" @click="firstButton(index)">مشاهده</a>
          </div>
        </div>
        <div
          class="col-12 col-xs-12 col-md-4 d-flex justify-content-center"
          v-if="infoPage.viewBool[index-1][1]"
        >
          <div class="card w-75">
            <img
              class
              :src="infoPage.eventList[index-1][1].image"
              alt="Card image"
              style="width:100%"
            />
            <h4 class="card-title mt-2 mx-2">{{infoPage.eventList[index-1][1].title}}</h4>
            <p class="card-text mx-2">توضیحات رویداد</p>
            <a class="btn card-btn" @click="secondButton(index)">مشاهده</a>
          </div>
        </div>
        <div
          class="col-12 col-xs-12 col-md-4 d-flex justify-content-end"
          v-if="infoPage.viewBool[index-1][2]"
        >
          <div class="card w-75">
            <img
              class
              :src="infoPage.eventList[index-1][2].image"
              alt="Card image"
              style="width:100%"
            />
            <h4 class="card-title mt-2 mx-2">{{infoPage.eventList[index-1][2].title}}</h4>
            <p class="card-text mx-2">توضیحات رویداد</p>
            <a class="btn card-btn" @click="thirdButton(index)">مشاهده</a>
          </div>
        </div>
      </div>

      <br id="more-btn" />
      <button
        v-if="infoPage.boolCheck"
        type="submit"
        class="btn my-btn more"
        @click="increaseEvent"
      >بیشتر</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      infoPage: {
        eventList: [],
        viewBool: [],
        numberRow: 1,
        offset: 0,
        boolCheck: true
      },
      infoSearch: {
        nameOfEvent: "",
        typeOfEvent: "",
        categoryOfEvent: "",
        cityOfEvent: "",
        sortOfEvent: ""
      },
      loadDataSearch: {
        type: [],
        category: [],
        city: []
      }
    };
  },
  beforeRouteEnter: function(to, from, next) {
    function getLoadEvent() {
      return axios.get(
        "http://localhost:8000/event/event-list/?limit=3&offset=0",
        {
          responseType: "json"
        }
      );
    }
    function getEventType() {
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
    axios.all([getLoadEvent(),getEventType(),getEventCategory(),getEventCity()]).then(
      axios.spread(function(loadEvent,type,category,city) {
        next(vm => {
          vm.setLoadEvent(loadEvent);
          vm.setType(type);
          vm.setCategory(category);
          vm.setCity(city);
        });
      })
    );
  },
  methods: {
    setLoadEvent: function(response) {
      console.log("list-event", response.data);
      let event_row = [];
      let bool_row = [false, false, false];
      for (let key in response.data.results) {
        event_row.push(response.data.results[key]);
        bool_row[key] = true;
      }
      this.infoPage.eventList.push(event_row);
      this.infoPage.viewBool.push(bool_row);
    },
    setType: function(response) {
      for (let key in response.data) {
        this.loadDataSearch.type.push(response.data[key]);
      }
      console.log("typeSearchBox", this.loadDataSearch.type);
    },
    setCategory: function(response) {
      for (let key in response.data) {
        this.loadDataSearch.category.push(response.data[key]);
      }
      console.log("categorySearchBox", this.loadDataSearch.category);
    },
    setCity: function(response) {
      for (let key in response.data) {
        this.loadDataSearch.city.push(response.data[key]);
      }
      console.log("citySearchBox", this.loadDataSearch.city);
    },
    firstButton: function(idx) {
      console.log("id1", this.infoPage.eventList[idx - 1][0].id);
      this.$router.push("/buyTicket/" + this.infoPage.eventList[idx - 1][0].id);
    },
    secondButton: function(idx) {
      console.log("id1", this.eventList[idx][1]);
      this.$router.push("/buyTicket/" + this.infoPage.eventList[idx - 1][1].id);
    },
    thirdButton: function(idx) {
      console.log("id1", this.eventList[idx][1]);
      this.$router.push("/buyTicket/" + this.infoPage.eventList[idx - 1][2].id);
    },
    increaseEvent: function() {
      console.log("11", this.infoPage.eventList);
      console.log("12", this.infoPage.viewBool);
      this.infoPage.numberRow++;
      this.infoPage.offset += 3;
      axios
        .get(
          "http://localhost:8000/event/event-list/?limit=3&offset=" +
            this.infoPage.offset
        )
        .then(res => {
          console.log("page ination", res.data);
          let event_row_list = [];
          let bool_row_list = [false, false, false];
          for (let key in res.data.results) {
            console.log("key", key);
            event_row_list.push(res.data.results[key]);
            bool_row_list[key] = true;
          }
          this.infoPage.eventList.push(event_row_list);
          this.infoPage.viewBool.push(bool_row_list);
          this.infoPage.boolCheck =
            bool_row_list[0] & bool_row_list[1] & bool_row_list[2];
          console.log("boolCheck", this.infoPage.boolCheck);
          //console.log("11",this.infoPage.eventList)
          //console.log("12",this.infoPage.viewBool)
        })
        .catch(error => console.log("erroe ination", error.response));
      //window.localStorage.setItem('infoPage', JSON.stringify(this.infoPage));
    },
    submitSearch:function(){
      
    }
  }
};
</script>
<style  scoped>
.my-btn {
  background-color: #4531ba;
  color: #fff;
}
.my-btn:hover {
  background-color: #fff;
  color: #4531ba;
  border: 0.1rem solid #4531ba;
}
.w-35 {
  width: 35%;
}
.card {
  border-radius: 0.3rem;
  border: none;
  box-shadow: 1px 1px 4px #ddd;
}
.card img {
  border-top-left-radius: 0.3rem;
  border-top-right-radius: 0.3rem;
}
.card-title {
  font-size: 1rem;
  color: #444;
}
.card-text {
  font-size: 0.8rem;
  color: #666;
  text-align: justify;
}
.w-35 .card-title {
  font-size: 1.2rem;
  color: #444;
  font-weight: 700;
}
.w-35 .card-text {
  font-size: 0.9rem;
  color: #666;
  text-align: justify;
}
.card-btn {
  width: 100%;
  background-color: #4531ba;
  color: white;
  border-radius: 0;
  border-bottom-left-radius: 0.3rem;
  border-bottom-right-radius: 0.3rem;
}
.card-btn:hover {
  background-color: #fff;
  border: 0.1rem solid #4531ba;
  color: #4531ba;
}
.more {
  text-align: center;
  padding: 0.5rem 2rem;
  margin: 0 auto 2rem;
  display: flex;
}
.my-btn:hover {
  background-color: #fff;
  color: #4531ba;
  border: 0.1rem solid #4531ba;
}

.w-65 {
  width: 85%;
}

input,
textarea,
select {
  -webkit-transition: all 0.3s ease-in-out !important;
  transition: all 0.3s ease-in-out !important;
}
input:focus,
textarea:focus,
select:focus {
  box-shadow: none !important;
  border: 0.2rem solid #ff7840 !important;
}

.search-box h3 {
  margin-top: 3rem;
  margin-bottom: 2rem;
  font-size: 1.5rem;
  color: #4531ba;
  font-weight: 700;
}
.search-box label {
  font-size: 1rem;
}
</style>