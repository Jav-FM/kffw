<template>
  <div class="container d-flex justify-content-around flex-wrap mt-5 mb-5">
    <!--Card de producto-->
    <div v-for="({data}, i) in productos" :key="i" class="productCard m-2">
      <b-card
        header="featured"
        header-tag="header"
        :title="data.nombre"
        :img-src="data.imagen"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 17rem"
        class="mb-2"
      >
        <template #header>
          <div class="d-flex align-items-center">
            <h4 v-if="data.estado" class="mb-0 mr-1">
              Disponible
            </h4>
            <h4 v-if="!data.estado" class="mb-0 mr-1" style="color=red;">
              No disponible
            </h4>
            <b-badge v-if="data.oferta" variant="danger">¡En oferta!</b-badge>
          </div>
          <div class="d-flex align-items-center">
            <p v-for="({talla, stock}, i) in data.tallas" :key="i" :class="{gris: stock == 0}" class="talla mx-1 mb-0">
              {{talla}}
            </p>
          </div>
        </template>

        <b-card-text class="d-flex">
          <p :class="{tachado: data.oferta}" class="mb-0 mr-1">$ {{data.precio}}</p>
          <p v-if="data.oferta" style="color:red;" class="mb-0"><b>{{data.precio-data.ofertaMonto}}</b></p>
        </b-card-text>

        <div class="d-flex justify-content-around">
          <b-button onmousedown="event.preventDefault()" class="btn botonRojo" v-b-modal="modalId(i)"
            >Ver detalles</b-button
          >
        </div>

        <!--Modal con detalle de producto-->
        <b-modal :id="'modal' + i" size="xl" centered :title="data.nombre">
          <div class="d-flex justify-content-center">
            <div class="mx-3">
              <img
                style="max-width: 400px"
                :src="data.imagen"
                alt="Foto Producto"
              />
            </div>
            <div class="mx-3 d-flex flex-column">
              <div class="d-flex">
                <h4 class="my-3 mr-2" :class="{tachado: data.oferta}">$ {{data.precio}}</h4>
                <h4 v-if="data.oferta" class="my-3" style="color:red;">$ {{data.precio-data.ofertaMonto}}</h4>
              </div>
              <div class="d-flex flex-column">
                <p>Selecciona la talla:</p>
                <b-form-select v-model="tallaSeleccionada" class="mb-3">
                  <b-form-select-option v-for="({talla, stock}, i) in data.tallas" :key="i" :value="talla" :disabled="stock == 0"
                    >{{talla}}</b-form-select-option>
                </b-form-select>
              </div>

              <p id="parradoAlerta" v-show="!tallaSeleccionada">Debes seleccionar una talla</p>
              <b-button
                class="btn botonRojo"
                style="width: 110px"
                onmousedown="event.preventDefault()"
                :disabled="!tallaSeleccionada"
                v-b-toggle.sidebar-carrito @click="addToCart(); $bvModal.hide(modalId(i))"
                >Agregar <b-icon icon="cart-plus-fill"></b-icon></b-button
              ><br />
              <p>
                <b>Detalle: </b>{{data.detalle}}</p>
              <br />
            </div>
          </div>
        </b-modal>
      </b-card>
    </div>
    <!--Sidebar de carrito-->
    <b-sidebar id="sidebar-carrito" title="Tu carro de compras" right shadow>
      <div class="px-3 py-2">
        <b-list-group>
          <b-list-group-item class="d-flex align-items-center">
            <img
              style="width: 50px"
              src="../../assets/Mockups_Poleras_01.jpg"
              alt="foto producto"
            />
            <p class="ml-3">Nombre producto</p>
          </b-list-group-item>
          <b-list-group-item class="d-flex align-items-center">
            <img
              style="width: 50px"
              src="../../assets/Mockups_Poleras_01.jpg"
              alt="foto producto"
            />
            <p class="ml-3">Nombre producto</p>
          </b-list-group-item>
        </b-list-group>
        <!--Sidebar footer-->
        <template>
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <b-button onmousedown="event.preventDefault()" class="btn botonRojo mx-auto" @click="goToCart"
              >Ir a comprar</b-button
            >
          </div>
        </template>
      </div>
    </b-sidebar>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: "ProductsGallery",
  data() {
    return {
      cards: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
      tallaSeleccionada: "",
    };
  },
  methods: {
    modalId(i) {
      return "modal" + i;
    },
    goToCart() {
      this.$router.push("carrito");
    },
    addToCart() {
    }
  },
  computed: {
    ...mapState(["productos"]),
  }
};
</script>

<style scoped>
.gris {
  color: #afb1b0;
}
.tachado {
  text-decoration:line-through;
}
#parradoAlerta {
  color: red;
}
</style>