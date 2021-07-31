<template>
  <div class="d-flex flex-column align-items-center">
    <h2 class="mt-4 mb-5">Carro de compras</h2>
    <!--Lista de Productos en Carrito-->
    <div>

        <b-list-group>
          <b-list-group-item v-for="({nombre, imagen, precio, oferta, ofertaMonto, tallas, cantidad, idPorTalla}, i) in getProductsInCart" :key="i" class="d-flex align-items-center">
            <div>
              <img style="width: 80px;" :src="imagen" alt="foto producto">
            </div>
            <div class="mx-3 d-flex flex-column justify-content-center">
              <p class="m-0">{{nombre}}</p>
              <p :class="{tachado: oferta}" class="m-0">$ {{precio}}</p>
              <p v-if="oferta" style="color:red;" class="m-0">${{precio-ofertaMonto}}</p>
            </div>
            <div class="mx-3 d-flex">
              <p class="mb-0 mr-1">Talla:</p>
              <p class="m-0">{{tallas}}</p>
            </div>
            <div class="mx-3 d-flex align-items-center">
              <b-button size="sm" style="width:25px;" class="botonNegro" @click="disminuirCarrito(idPorTalla)">-</b-button>
              <p class="my-0 mx-2">{{cantidad}}</p>
              <b-button size="sm" style="width:25px;" class="botonNegro" @click="aumentarCarrito(idPorTalla)">+</b-button>
            </div>
              <div class="mx-3 d-flex flex-column justify-content-center">
              <p class="m-0">Total:</p>
              <p v-if="!oferta" class="m-0">$ {{+precio*+cantidad}}</p>
              <p v-if="oferta" class="m-0">$ {{(precio-ofertaMonto)*cantidad}}</p>
            </div>
          </b-list-group-item>

        </b-list-group>

        <div v-if="carrito.length != 0" class="m-3 d-flex flex-column align-items-end">
          <h3>total: $ {{getTotal}}</h3>
          <b-button class="botonRojo mt-2" style="width:150px;">Finalizar compra</b-button>
        </div>
        <p v-if="carrito.length === 0">No hay nada en tu carro de compras.</p>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
    }
  },
  methods: {
    ...mapActions(["disminuir_Carrito","aumentar_Carrito","eliminar_Producto"]),
    disminuirCarrito(id, talla) {
      let thisIdPorTalla = id+talla
      let index = carrito.findIndex( p => p.idPorTalla === thisIdPorTalla);
      carrito[index].cantidad === 1
      ? this.eliminarProducto(index)
      : this.disminuir_Carrito(index)
    },
    aumentarCarrito(thisIdPorTalla) {
      debugger;
      let index = this.carrito.findIndex( p => p.idPorTalla == thisIdPorTalla)
      this.aumentar_Carrito(index);
    },
    eliminarProducto(idPorTalla) {
      let index = this.carrito.findIndex( p => p.idPorTalla === idPorTalla)
      this.eliminarProducto(index);
    }
  },
  computed: {
    ...mapState(["carrito"]),
    getProductsInCart() {
      return this.carrito;
    },
    getTotal() {
      //Voy a tener que corregir esta logica, ya que aun falta el poder sumar o restar productos.
      let totalesPorProducto = this.carrito.map(p => {
        if(p.oferta) {
          return p.precio-p.ofertaMonto;
        } else {
          return +p.precio
        }
      })
       return totalesPorProducto;
    }
  },
}
</script>

<style scoped>
.tachado {
  text-decoration:line-through;
}
</style>