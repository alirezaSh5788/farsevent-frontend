import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
import router from "./router"

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        token: null,
        wrongInfoLogin: false,
        signUpError: false,
        registerTicketNumber: '',
        checkHeader: false,
        typeEvent: {},
        event: [],
        categoryEvent: {},
        cityEvent:{}
    },
    mutations: {
        authUser(state, userData) {
            state.token = userData.token;
            router.push("/");
            console.log("ttoken", state.token)
        },
        authError(state, info) {
            if (info.info == 400) {
                state.wrongInfoLogin = true
            }
        },
        createError(state, info) {

        },
        saveRegisterNumber(state, idTicket) {
            state.registerTicketNumber = idTicket.id
        },
        clearToken(state) {
            state.token = null
            window.localStorage.removeItem('loginInfo');
        },
        setCheckHeader(state, checker) {
            state.checkHeader = checker.setCheckHeader
        },
        setEventData(state, dataLoad) {
            for (let key in dataLoad) { 
                state.event.push(dataLoad[key])
            }
            console.log("stateEvent",state.event)
        },
        setTypeData(state, dataLoad) {
            state.typeEvent = dataLoad
            console.log("stateType",state.typeEvent)
        },
        setCityData(state, dataLoad) {
            state.cityEvent = dataLoad
            console.log("stateCity",state.cityEvent)
        },
        setCategoryData(state, dataLoad) {
            state.categoryEvent = dataLoad
            console.log("stateCategory",state.categoryEvent)
        }
    },
    actions: {
        login({ commit }, authData) {
            axios
                .post("http://localhost:8000/auth/login/", {
                    username: authData.username,
                    password: authData.password
                })
                .then(res => {
                    console.log("info", res);
                    commit("authUser", {
                        token: res.data.token
                    });
                    window.localStorage.setItem('loginInfo', JSON.stringify(res));
                })
                .catch(error => {
                    console.log("loginError", error.response)
                    commit("authError", {
                        info: error.response.status
                    });
                });
        },
        signup({ commit }, authData) {
            axios
                .post("http://localhost:8000/auth/create/", {
                    username: authData.username,
                    password: authData.password,
                    email: authData.email,
                    phone: authData.phone,
                    firstName: authData.firstName,
                    lastName: authData.lastName,
                })
                .then(res => {
                    console.log(res);
                    commit("authUser", {
                        token: res.data.token
                    });
                })
                .catch(error => console.log(error.response));
        },
        register({ commit }, idTicket) {
            let idTicketToSever = {
                ticket: idTicket.ticket
            }
            console.log("idTicket", idTicket)
            console.log("idTicketToSever", idTicketToSever)
            axios.post("http://localhost:8000/event/register/", idTicketToSever,
                {
                    headers: {
                        Authorization: "Token " + idTicket.token
                    }
                }).
                then(
                    res => {
                        console.log("resBuyTicket", res)
                        console.log("buyToken", idTicket.token)
                        commit("saveRegisterNumber", {
                            id: res.data.registration_id
                        })
                    }
                )
                .catch(
                    error => console.log("buyTicketError", error.response)
                )
        },
        loadDataOfHomePage({commit}) {
            let eventData=[]
            var categoryData = {}
            var cityData = {}
            var typeData = {}
            axios.get("http://localhost:8000/event/event-list/?limit=5&offset=0").then(
                res => {
                    for (let key in res.data.results) {
                        eventData.push(res.data.results[key])
                    }
                    console.log("eventData", eventData)
                    commit('setEventData',eventData)
                }
            ).catch(
                error => {
                    console.log("errorEventData",error.response)
                }
            )
            axios.get("http://localhost:8000/event/all-categories/").then(
                res => {
                    for (let key in res.data) {
                        categoryData[res.data[key].name]=res.data[key].id
                    }
                    console.log("categoryData", categoryData)
                    commit('setCategoryData', categoryData)
                }
            ).catch(
                error => {
                    console.log("errorCategoryData", error)
                }
            )
            axios.get("http://localhost:8000/auth/all-cities").then(
                res => {
                    for (let key in res.data) {
                        cityData[res.data[key].name]=res.data[key].id;
                    }
                    console.log("cityData", cityData)
                    commit('setCityData', cityData)
                }
            ).catch(
                error => {
                    console.log("errorCityData", error.response)
                }
            )
            axios.get("http://localhost:8000/event/all-types/").then(
                res => { 
                    for (let key in res.data) {
                        typeData[res.data[key].name]=res.data[key].id;
                    }
                    console.log("typeData", typeData)
                    commit('setTypeData', typeData)
                }
            ).catch(
                error => {
                    console.log("errorTypeData", error.response)
                }
            )
        }
    },
    getters: {
        loginError: state => {
            return state.wrongInfoLogin
        },
        getToken: state => {
            let tokenInfo = state.token;
            if (!tokenInfo) {
                tokenInfo = JSON.parse(window.localStorage.getItem('loginInfo') || null).data.token
            }
            return tokenInfo;
        },
        getRegisterNumber: state => {
            return state.registerTicketNumber
        },
        getTypeEvent: state => {
            return state.typeEvent
        },
        getEvent: state => {
            return state.event
        },
        getCategoryEvent: state => {
            return state.categoryEvent
        },
        getCityEvent: state => {
            return state.cityEvent
        }
    }
});