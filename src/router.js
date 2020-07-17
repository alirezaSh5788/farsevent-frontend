import Vue from "vue";
import VueRouter from "vue-router";
import store from "./store"

import login from "./components/auth/login.vue";
import SignUp from "./components/auth/SignUp.vue";
import HomePage from "./components/home/HomePage.vue";
import createEventForm from "./components/event/createEvent/CreateEventForm.vue";
import allEvent from "./components/event/viewEvent/allEvent.vue";
import buyTicket from "./components/event/viewEvent/buyTicket.vue";
import profile from "./components/User/profile.vue"

Vue.use(VueRouter)
const routes = [
    {
        path: "/login",
        component: login,
    },
    {
        path: "/signup",
        component: SignUp,
    },
    { path: "", component: HomePage },
    {
        path: "/createEvent", component: createEventForm
    },
    {
        path: "/allEvent/", component: allEvent
    },
    {
        path: "/buyTicket/:id", component: buyTicket
    },
    {
        path: "/profile", component: profile
    }
];
export default new VueRouter({ mode: 'history', routes })