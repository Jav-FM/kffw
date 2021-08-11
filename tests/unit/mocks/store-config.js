
export default {
  state: {
    logedInUser: null,
    telonActivo: true,
    productos: [
      {
        id: "dkad23a",
        data: {
          nombre: "Producto",
          detalle: "Mi producto",
          imagen: {
            nameFile: "mi_imagen.jpg",
            url: "http://mi_imagen.jpg"
          },
          estado: true,
          precio: 10000,
          oferta: true,
          ofertaMonto: 2000,
          tematica: "otros",
          tallas: [
            {
              stock: "1",
              talla: "s"
            },
            {
              stock: "2",
              talla: "m"
            },
            {
              stock: "5",
              talla: "l"
            },
            {
              stock: "0",
              talla: "xl"
            },
          ],
        }
      }
    ],
    carrito: [],
    montoPago: 0,
    ventaActual: {},
    ventas: [],
  },
  mutations: {
    SET_USER(state, userInfo) {
      state.logedInUser = userInfo;
    },
    LOG_OUT(state) {
      state.logedInUser = null;
    },
    GET_PRODUCTS(state, productos) {
      state.productos = productos;
    },
    ADD_TO_CART(state, producto) {
      state.carrito.push(producto);
    },
    AUMENTAR_CARRITO(state, index) {
      state.carrito[index].cantidad += 1;
    },
    DISMINUIR_CARRITO(state, index) {
      state.carrito[index].cantidad -= 1;
    },
    ELIMINAR_PRODUCTO(state, index) {
      state.carrito.splice(index, 1);
    },
    PRODUCTO_NO_DISPONIBLE(state, index) {
      state.productos[index].data.estado = false;
    },
    PRODUCTO_DISPONIBLE(state, index) {
      state.productos[index].data.estado = true;
    },
    DESACTIVAR_TELON(state){
        state.telonActivo = false;
    },
    ASIGNAR_MONTO_PAGO(state, monto){
        state.montoPago = monto;
    },
    GET_SALES(state, ventas) {
      state.ventas = ventas;
    },
    GUARDAR_VENTA(state, venta) {
      state.ventaActual = venta;
    },
    BORRAR_DATOS_VENTA(state) {
      state.ventaActual = [];
      state.carrito = [];
      state.montoPago = 0;
    }
  },
  actions: {
    async sing_In({ commit }, { email, password }) {
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
    log_Out({ commit }) {
      commit("LOG_OUT");
    },
    authStateChange({ commit }) {
      firebase.auth().onAuthStateChanged((userCredential) => {
        if (userCredential) {
          const { email } = userCredential;
          commit("SET_USER", email);
        } else {
          commit("SET_USER", null);
        }
      });
    },
    create_Product({ dispatch }, newProduct) {
      firebase
        .firestore()
        .collection("productos")
        .add(newProduct);
      dispatch("get_Products");
    },
    get_Products({ commit }) {
      firebase
        .firestore()
        .collection("productos")
        .onSnapshot((snapshot) => {
          const productos = [];
          snapshot.forEach((doc) => {
            productos.push({ id: doc.id, data: doc.data() });
          });
          commit("GET_PRODUCTS", productos);
          commit("DESACTIVAR_TELON");
        });
    },
    get_Sales({ commit }) {
      firebase
        .firestore()
        .collection("ventas")
        .orderBy("timeStamp", "asc")
      firebase
        .firestore()
        .collection("ventas")
        .onSnapshot((snapshot) => {
          const ventas = [];
          snapshot.forEach((doc) => {
            ventas.push({ id: doc.id, data: doc.data() });
          });
          commit("GET_SALES", ventas);
        });
    },
    add_Sale({ dispatch, state }) {
      let nuevaVenta = state.ventaActual;
      nuevaVenta.productos = state.carrito;
      nuevaVenta.createdAt = firebase.firestore.FieldValue.serverTimestamp();
      firebase
        .firestore()
        .collection("ventas")
        .add(nuevaVenta);
      dispatch("get_Sales");
      dispatch("reduce_Stock")
    },
    guardar_Venta({commit}, venta) {
      commit("GUARDAR_VENTA", venta)
    },
    reduce_Stock({commit, state, dispatch}) {
      state.carrito.forEach(pv => {
        let productoAEditar = state.productos.filter(({id}) => id === pv.id)
        productoAEditar[0].data.tallas.forEach((t, i) => {
          if (t.talla == pv.tallas) productoAEditar[0].data.tallas[i].stock -= pv.cantidad
        })
        console.log(productoAEditar[0])
        dispatch("update_Product", productoAEditar[0])
      });
      commit("GET_PRODUCTS")
      commit("BORRAR_DATOS_VENTA");
    },

    update_Product({ commit }, { id, data }) {
      firebase
        .firestore()
        .collection("productos")
        .doc(id)
        .set(data);
    },
    async delete_Product({ commit, state }, productId) {
      let producto = state.productos.filter((p, i) => {
        if (p.id == productId) return p;
      });
      let imagenAEliminar = producto[0].data.imagen.nameFile
      try {
        const storageRef = firebase.storage().ref();
        const fileDirection = storageRef.child(`imagenesproductos/${imagenAEliminar}`);
        await fileDirection.delete();
      } catch (e) {
        console.log(e)
      }
      firebase
        .firestore()
        .collection("productos")
        .doc(productId)
        .delete();
    },
    add_To_Cart({ commit, state }, { id: idProducto, talla }) {
      let productoAAgregar = state.productos.filter((p) => {
        if (p.id == idProducto) return p;
      });
      let productoPreparado = { ...productoAAgregar[0].data };
      productoPreparado.tallas = talla;
      productoPreparado.cantidad = 1;
      productoPreparado.id = idProducto;
      productoPreparado.idPorTalla = idProducto + talla;
      commit("ADD_TO_CART", productoPreparado);
    },
    aumentar_Carrito({ commit }, index) {
      commit("AUMENTAR_CARRITO", index);
    },
    disminuir_Carrito({ commit }, index) {
      commit("DISMINUIR_CARRITO", index);
    },
    eliminar_Producto({ commit }, index) {

      commit("ELIMINAR_PRODUCTO", index);
    },
    actualizarEstado({ commit, state }) {
      state.productos.forEach(({ data }, i) => {
        const stockTotal = data.tallas.reduce((acc, { stock }) => {
          return acc + +stock;
        }, 0);
        stockTotal === 0
          ? commit("PRODUCTO_NO_DISPONIBLE", i)
          : commit("PRODUCTO_DISPONIBLE", i);
      });
    },
    asignar_Monto_Pago({ commit }, monto) {
      commit("ASIGNAR_MONTO_PAGO", monto)
    }
  },
  getters: {
    getCartNumber: (state) => {
      const productsInCartNumber = state.carrito.reduce((acc, { cantidad }) => {
        return acc + +cantidad;
      }, 0);
      return productsInCartNumber;
    },
  },
};
