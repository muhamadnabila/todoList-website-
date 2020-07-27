import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
    AUTH_LOGOUT
  } from "../actions/auth";
  import axios from "../../utils/api";
  
  const state = {
    token: localStorage.getItem("user-token") || "",
    status: "",
  };
  
  const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
  };
  
  const actions = {
    [AUTH_REQUEST]: ({ commit }, user) => {
      return new Promise((resolve, reject) => {
        commit(AUTH_REQUEST);
        let param = {}
        if(user.name[0]) {
          param.name = user.name,
          param.email = user.email,
          param.password = user.password
        } else {
          param.email = user.email,
          param.password = user.password
        }
        axios({ url: user.name[0] ? "auth/register" : "auth/login", data: param, method: "POST" })
          .then(({ data: { data } }) => {
            localStorage.setItem("user-token", data.token);
            axios.defaults.headers.common['Authorization'] = data.token
            commit(AUTH_SUCCESS, data);
            resolve(data);
          })
          .catch(err => {
            commit(AUTH_ERROR, err);
            localStorage.removeItem("user-token");
            reject(err);
          });
      });
    },
    [AUTH_LOGOUT]: ({ commit }) => {
      return new Promise(resolve => {
        commit(AUTH_LOGOUT);
        localStorage.removeItem("user-token");
        resolve();
      });
    }
  };
  
  const mutations = {
    [AUTH_REQUEST]: state => {
      state.status = "loading";
    },
    [AUTH_SUCCESS]: (state, data) => {
      state.status = "success";
      state.token = data.token;
    },
    [AUTH_ERROR]: state => {
      state.status = "error";
    },
    [AUTH_LOGOUT]: state => {
      state.token = "";
    }
  };
  
  export default {
    state,
    getters,
    actions,
    mutations
  };
  