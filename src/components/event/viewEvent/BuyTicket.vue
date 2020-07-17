<template>
    <div class="container pt-3 my-3">
        <h4>رویداد</h4>
        <div class="container bg-light border pt-3 my-3">
            <div class="card pt-3 my-3">
                <div class="row">
                    <div class="col">
                        <img :src="showEvent.image" width="100%">
                    </div>
                    <div class="col">
                        <h3>{{showEvent.title}}</h3>
                        <br>
                        <p>شروع رویداد:{{showEvent.start_time}}</p>
                        <p>پایان رویداد:{{showEvent.end_time}}</p>
                        <br>
                        <p>موضوع:{{showEvent.event_category}}</p>
                        <p>نوع:{{showEvent.event_type}}</p>
                        <br>
                    </div>
                </div>
            </div>

            <h6>توضیحات</h6>
            <p>{{showEvent.description}}</p>
            <div 
            v-for="index in search.numberTicket" :key="index"
            class="container p-3 my-3 bg-dark text-white" id="blit" >
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-sm-3">
                            <h6>عنوان بلیط</h6>
                        </div>
                        <div class="col-sm-2">
                            <h6>ظرفیت باقی مانده</h6>
                        </div>
                        <div class="col-sm-2">
                            <h6>قیمت</h6>
                        </div>
                        <div class="col-sm-2">
                            <h6>تعداد</h6>
                        </div>
                    </div>
                </div>
                <div class="container-fluid bg-light text-dark p-3 my-3">
                    <div class="row">
                        <div class="col-sm-3">
                            <p>{{showEvent.tickets[index-1].title}}</p>
                        </div>
                        <div class="col-sm-2">
                            <p>{{showEvent.tickets[index-1].capacity}}</p>
                        </div>
                        <div class="col-sm-2">
                            <p>{{showEvent.tickets[index-1].price}}</p>
                        </div>
                        <div class="col-sm-2">
                            <select class="form-control" id="tedad">
                                <option>1</option>
                            </select>
                        </div>
                        <div class="col text-center">
                            <button type="button" class="btn btn-primary" @click="onSubmit(index)">ثبت بلیط</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data(){
        return{
            showEvent:{
                id:'',
                title:'',
                image:'',
                description:'',
                start_time:'',
                end_time:'',
                tags:'',
                event_type:'',
                event_category:'',
                city:'',
                address:'',
                tickets:[]
            },
            search:{
                type:[],
                category:[],
                city:[],
                numberTicket:0,
            }
        }
    },
    beforeRouteEnter: function(to, from, next) {
    function getInfoEvent() {
      return axios.get("http://localhost:8000/event/event/".concat(to.params.id), {
        responseType: "json"
      });
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
    axios.all([getInfoEvent(),getEventTtpe(),getEventCategory(),getEventCity()]).then(
      axios.spread(function(info,type,category,city) {
        next(vm => {
          vm.setType(type);
          vm.setCategory(category);
          vm.setCity(city);
          vm.setInfo(info);
        });
      })
    );
  },
  methods:{
    setInfo:function(response){
        console.log("enterToPage",response)
        this.showEvent.id=response.data.id
        this.showEvent.title=response.data.title
        this.showEvent.image=response.data.image
        this.showEvent.description=response.data.description
        this.showEvent.start_time=response.data.start_time
        this.showEvent.end_time=response.data.end_time
        this.showEvent.tags=response.data.tags
        this.showEvent.address=response.data.address
        for(let key in response.data.tickets){
            this.showEvent.tickets.push(response.data.tickets[key])
        }
        console.log("111",this.search.type)
        for(let key in this.search.type){
            if(response.data.event_type==this.search.type[key].id){
                this.showEvent.event_type=this.search.type[key].name
                break
            }
        }
        for(let key in this.search.category){
            if(response.data.event_category==this.search.category[key].id){
                this.showEvent.event_category=this.search.category[key].name
                break
            }
        }
        for(let key in this.search.city){
            if(response.data.city==this.search.city[key].id){
                this.showEvent.city=this.search.city[key].name
                break
            }
        }
        this.search.numberTicket=this.showEvent.tickets.length
        console.log("len",this.search.numberTicket)
        console.log("infooo",this.showEvent)
    },
     setType:function(response){
        console.log("infoType",response)
        for(let key in response.data){
            this.search.type.push(response.data[key])
        }
        console.log("infoType1",this.search.type)
    },
    setCategory:function(response){
        console.log("infoCategory",response)
        for(let key in response.data){
            this.search.category.push(response.data[key])
        }
        console.log("infoCategory1",this.search.category)
    },
    setCity:function(response){
        console.log("infoCity",response)
        for(let key in response.data){
            this.search.city.push(response.data[key])
        }
        console.log("infoCity",this.search.city)
    },
    onSubmit:function(idx){
        let idTicket={
            ticket:this.showEvent.tickets[idx-1].id,
            token:this.$store.getters.getToken
        }
        //console.log("85",this.showEvent.tickets[idx-1].id)
       this.$store.dispatch("register", idTicket);
    }
  },
}
</script>
<style scoped>

</style>