import axios from "@/axios/request";
import store from "../index";

export default {
  namespaced: true,
  state() {
    return {
      requests: [],
    };
  },

  getters:{
    requests(state){
        return state.requests;
    }
  },

  mutations: {
    setRequests(state, requests) {
      state.requests = requests;
    },
    addRequest(state, request) {
      state.requests.push(request);
    },
  },

  actions: {
    // Create new Request in firebase DB
    async create({ commit, dispatch }, payload) {
      try {
        const token = store.getters["auth/token"];
        const { data } = await axios.post(
          `/requests.json?auth=${token}`,
          payload
        );
        commit('addRequest', {...payload, id:data.name})
        dispatch("setMessage", {
          value: "Заявка успешно создана",
          type: "primary",
        },{root:true});
      } catch (e) {
        dispatch("setMessage", {
          value: e.message,
          type: "danger",
        },{root:true});
      }
    },
    // Load list of all requests 
    async loadRequests({commit, dispatch}){
      try {
        const token = store.getters["auth/token"];
        const { data } = await axios.get(
          `/requests.json?auth=${token}`
        );
        const requests = Object.keys(data).map(id => ({...data[id], id}) )
        commit('setRequests', requests)
        
      } catch (e) {
        dispatch("setMessage", {
          value: e.message,
          type: "danger",
        },{root:true});
      }
    },
    //Load single request by id
    async loadById({dispatch}, id){
      try {
        const token = store.getters["auth/token"];
        const { data } = await axios.get(
          `/requests/${id}.json?auth=${token}`
        );
        return {data}
        
      } catch (e) {
        dispatch("setMessage", {
          value: e.message,
          type: "danger",
        },{root:true});
      }
    },
    //Remove req by id
    async removeById({dispatch}, id){
      try {
        const token = store.getters["auth/token"];
        await axios.delete(`/requests/${id}.json?auth=${token}`);
        dispatch("setMessage",{
          value: 'Заявка удалена',
          type: 'warning'
        }, {root:true})
      } catch (e) {
        dispatch("setMessage", {
          value: e.message,
          type: "danger",
        },{root:true});
      }
    },

    async updateById({dispatch}, request){
      try {
        const token = store.getters["auth/token"];
        await axios.put(`/requests/${request.id}.json?auth=${token}`, request);
        dispatch("setMessage",{
          value: 'Заявка обновлена',
          type: 'primary'
        }, {root:true})
        
      } catch (e) {
        dispatch("setMessage", {
          value: e.message,
          type: "danger",
        },{root:true});
      }
    }
  },
};
