import { createStore, createLogger } from "vuex";
import auth from "./modules/auth.module";
import request from './modules/request.module'

const plugins = [];

if (process.env.NODE_ENV === "development") {
  plugins.push(createLogger());
}

export default createStore({
  plugins,
  state() {
    return {
      message: null,
      sidebar: false,
    };
  },
  getters: {
    message(state){
      return state.message;
    },
    sidebar(state){
      return state.sidebar;
    }
  },
  mutations: {
    setMessage(state, message) {
      state.message = message;
    },
    clearMessage(state) {
      state.message = null;
    },
    openSidebar(state){
      state.sidebar = true;
    },
    closeSidebar(state){
      state.sidebar = false;
    }
  },
  actions: {
    setMessage({ commit }, message) {
      commit("setMessage", message);
      setTimeout(() => {
        commit("clearMessage");
      }, 5000);
    },
  },

  modules: {
    auth,
    request,
  },
});
