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
        checkHeader: false
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
    }
});