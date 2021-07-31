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
    carrito: [],
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
    },
    ADD_TO_CART(state, producto) {
      state.carrito.push(producto);
    },
    AUMENTAR_CARRITO(state, index) {
      state.carrito[index].cantidad += 1;
      debugger;
    },
    DISMINUIR_CARRITO(state, index) {
      state.carrito[index].cantidad -= 1;
    },
    ELIMINAR_PRODUCTO(state, index) {
      state.carrito.splice(index, 1)
    },
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
    update_Product({commit}, {id, data}) {
    firebase.firestore().collection("productos").doc(id).set(data)
    },
    delete_Product({commit}, id) {
    firebase.firestore().collection("productos").doc(id).delete()
    },
    add_To_Cart({commit, state}, {id: idProducto, talla}) {
      let productoAAgregar = state.productos.filter(p => {
        if (p.id == idProducto) return p
        });
      let productoPreparado ={...productoAAgregar[0].data}
      productoPreparado.tallas = talla;
      productoPreparado.cantidad = 1;
      productoPreparado.id = idProducto;
      productoPreparado.idPorTalla = idProducto+talla
        console.log(productoPreparado)
      commit("ADD_TO_CART", productoPreparado)
    },
    aumentar_Carrito({commit}, {index}) {
      commit("AUMENTAR_CARRITO", index);
    },
    disminuir_Carrito({commit}, index) {
      commit("DISMINUIR_CARRITO", index);
    },
    eliminar_Carrito({commit}, index) {
      commit("ELIMINAR_PRODUCTO", index);
    },
  },
  getters: {
    getCartNumber: state => {
      return state.carrito.length;
    }
  },
  plugins: [createPersistedState()],
})
