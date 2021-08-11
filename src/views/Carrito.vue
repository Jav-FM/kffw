<template>
<div id="fondo">
  <div class="carrito d-flex flex-column align-items-center">
    <h2 class="mt-4 mb-5">Carro de compras</h2>
    <!--Lista de Productos en Carrito-->
    <div>
      <b-list-group>
        <b-list-group-item
          v-for="(
            {
              nombre,
              imagen,
              precio,
              oferta,
              ofertaMonto,
              tallas,
              cantidad,
              idPorTalla,
              id,
            },
            i
          ) in getProductsInCart"
          :key="i"
          class="itemCarrito d-flex align-items-center justify-content-between"
        >
          <div>
            <img style="width: 80px" :src="imagen.url" alt="foto producto" />
          </div>
          <div
            class="mx-3 my-2 d-flex flex-column justify-content-center"
            style="width: 200px"
          >
            <p class="m-0">{{ nombre }}</p>
            <div id="valoresProducto" class="d-flex">
              <p :class="{ tachado: oferta }" class="m-0 mr-2">
                $ {{ precio }}
              </p>
              <p v-if="oferta" style="color: red" class="m-0">
                ${{ precio - ofertaMonto }}
              </p>
            </div>
          </div>
          <div class="mx-3 my-2 d-flex" style="width: 60px">
            <p class="mb-0 mr-1">Talla:</p>
            <p class="m-0">{{ tallas }}</p>
          </div>
          <div class="mx-3 my-2 d-flex align-items-center" style="width: 80px">
            <b-button
              size="sm"
              style="width: 25px"
              class="botonNegro"
              @click="disminuirCarrito(idPorTalla)"
              >-</b-button
            >
            <p class="my-0 mx-2">{{ cantidad }}</p>
            <b-button
              size="sm"
              style="width: 25px"
              class="botonNegro"
              @click="aumentarCarrito(idPorTalla, id, tallas, cantidad)"
              >+</b-button
            >
          </div>
          <div
            class="mx-3 my-2 d-flex flex-column justify-content-center"
            style="width: 80px"
          >
            <p class="m-0">Total:</p>
            <p v-if="!oferta" class="m-0">$ {{ +precio * +cantidad }}</p>
            <p v-if="oferta" class="m-0">
              $ {{ (precio - ofertaMonto) * cantidad }}
            </p>
          </div>
          <b-icon
            id="deleteIcon"
            style="cursor: pointer"
            class="h4 align-self-start"
            icon="x-circle-fill"
            variant="danger"
            @click="showModalToDelete(i)"
          ></b-icon>
        </b-list-group-item>
      </b-list-group>

      <!--Detalle de total-->
      <div
        v-if="carrito.length != 0"
        class="m-3 d-flex flex-column align-items-end"
      >
        <h3>total: $ {{ getTotal.toLocaleString() }}</h3>
        <b-button class="botonRojo mt-2" style="width: 150px" @click="goToTransbank"
          >Finalizar compra</b-button
        >
      </div>
      <p v-if="carrito.length === 0">No hay nada en tu carro de compras.</p>

      <!--Modal para eliminar producto-->
      <b-modal ref="delete-of-cart-modal" hide-footer>
        <div class="d-block">
          <p>¿Quieres eliminar este producto del carro de compras?</p>
        </div>
        <b-button @click="eliminarProducto()" class="btn botonNegro m-2" id="deleteButton"
          >Eliminar</b-button
        >
        <b-button class="btn botonRojo m-2" @click="hideModal"
          >Cancelar</b-button
        >
      </b-modal>
    </div>

  </div>
</div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  data() {
    return {
      indexToDelete: 0,
    };
  },
  methods: {
    ...mapActions([
      "disminuir_Carrito",
      "aumentar_Carrito",
      "eliminar_Producto",
      "asignar_Monto_Pago"
    ]),
    disminuirCarrito(thisIdPorTalla) {
      let index = 0;
      index = this.carrito.findIndex((p) => p.idPorTalla === thisIdPorTalla);
      if (this.carrito[index].cantidad === 1) {
        this.showModalToDelete(index);
      } else {
        this.disminuir_Carrito(index);
      }
    },
    aumentarCarrito(thisIdPorTalla, idProducto, tallas, cantidad) {
      const stock = this.productos.filter(({id}) => id === idProducto)[0].data.tallas.filter(t => t.talla === tallas)[0].stock
      if(stock < cantidad+1) {
        alert(`No tenemos suficiente stock. El stock actual de este producto es: ${stock}`)
      } else {
        let index = 0;
        index = this.carrito.findIndex((p) => p.idPorTalla == thisIdPorTalla);
        this.aumentar_Carrito(index);
      }
    },
    eliminarProducto() {
      this.eliminar_Producto(this.indexToDelete);
      this.hideModal();
    },
    showModalToDelete(index) {
      this.indexToDelete = index;
      this.$refs["delete-of-cart-modal"].show();
    },
    hideModal() {
      this.$refs["delete-of-cart-modal"].hide();
    },
    goToTransbank() {
      this.asignar_Monto_Pago(this.getTotal)
      this.$router.push('transbank');
    }
  },
  computed: {
    ...mapState(["carrito","productos"]),
    getProductsInCart() {
      return this.carrito;
    },
    getTotal() {
      let totalesPorProducto = this.carrito.map((p) => {
        let totalPorProducto = 0;
        p.oferta
          ? (totalPorProducto = +p.precio - +p.ofertaMonto)
          : (totalPorProducto = +p.precio);
        let totalProductos = totalPorProducto * p.cantidad;
        return totalProductos;
      });
      return totalesPorProducto.reduce((acc, precio) => acc + precio);
    },
  },
};
</script>

<style scoped>
.carrito {
  margin-bottom: 100px;
}

.tachado {
  text-decoration: line-through;
}
#deleteIcon {
  position: absolute;
  top: 5px;
  right: 5px;
}
@media screen and (max-width: 670px) {
  .itemCarrito {
    flex-direction: column;
    text-align: center;
  }
  #valoresProducto {
    justify-content: center;
  }
}

@media screen and (min-width: 670px) {
  #fondo {
    width: 100%;
    height: 100vh;
    background-image: url("../assets/fondo.jpg");
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
}

</style>