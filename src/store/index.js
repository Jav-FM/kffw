import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";
import firebase from 'firebase';
import router from "@/router";

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logedInUser: null,
    productos: [],
  },
  mutations: {
    SET_USER(state, userInfo) {
      state.logedInUser = userInfo;
    },
    LOG_OUT(state) {
      state.logedInUser = null
    },
    GET_PRODUCTS(state, productos) {
      state.productos = productos;
    }
  },
  actions: {
    async sing_In({commit}, {email, password}) {
      try {
        const { user } = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
        commit("SET_USER", user.bc.email);
        router.push("/adminproductos");
      } catch (error) {
        alert(error.message);
      }
    },
    log_Out({commit}) {
      commit("LOG_OUT");
    },
    authStateChange({commit}) {
      firebase.auth().onAuthStateChanged((userCredential) => {
        if (userCredential) {
          const { email } = userCredential;
          commit('SET_USER', email);
        } else {
          commit('SET_USER', null);
        }
      });
    },
    create_Product({dispatch}, newProduct) {
      firebase.firestore().collection("productos").add(newProduct)
      dispatch("get_Products")
    },
    get_Products({commit}) {
      firebase.firestore().collection("productos")
      .onSnapshot((snapshot) => {
        const productos = []
        snapshot.forEach((doc) => {
          productos.push({id: doc.id, data: doc.data()})
        });
        commit("GET_PRODUCTS", productos)
      })
    },
    update_Product({commit, state}, {id, data}) {
    firebase.firestore().collection("productos").doc(id).set(data)
    },
    delete_Product({commit, state}, id) {
    firebase.firestore().collection("productos").doc(id).delete()
    },
  },
  getters: {

  },
  plugins: [createPersistedState()],
})
