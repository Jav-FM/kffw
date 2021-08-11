<template>
<div class="container-fluid" style="width: 100vw;">
  <div id="foundedProducts" class="container d-flex justify-content-start mt-2 pl-1">
      <h4 class="pl-0">Resultados encontrados: {{productsToShow.length}}</h4>
  </div>
<div id="productsGallery" class="mx-auto">
  <div class="d-flex justify-content-around flex-wrap mt-5 mb-5">
    <!--Card de producto-->
    <h4 v-if="productsToShow.length == 0">No hay productos para mostrar.</h4>
    <div
      v-for="({ data, id: productId }, i) in productsToShow"
      :key="i"
      class="productCard m-2"
    >
      <b-card
        id="productCard"
        header="featured"
        header-tag="header"
        :title="data.nombre"
        :img-src="data.imagen.url"
        img-alt="Image"
        img-top
        tag="article"
        style="max-width: 17rem; height: 580px"
        class="mb-2"
      >
        <template #header>
          <div class="d-flex align-items-center">
            <h4 v-if="data.estado" class="mb-0 mr-1">Disponible</h4>
            <h4 v-if="!data.estado" class="mb-0 mr-1" style="color: red">
              Agotado
            </h4>
            <b-badge v-if="data.oferta" variant="danger">¡En oferta!</b-badge>
          </div>
          <div class="d-flex align-items-center">
            <p
              v-for="({ talla, stock }, i) in data.tallas"
              :key="i"
              :class="{ gris: stock == 0 }"
              class="talla mx-1 mb-0"
            >
              {{ talla }}
            </p>
          </div>
        </template>

        <b-card-text class="d-flex">
          <p :class="{ tachado: data.oferta }" class="mb-0 mr-1">
            ${{ data.precio }}
          </p>
          <p v-if="data.oferta" style="color: red" class="mb-0">
            <b>${{ data.precio - data.ofertaMonto }}</b>
          </p>
        </b-card-text>

        <div class="d-flex justify-content-center">
          <b-button
            onmousedown="event.preventDefault()"
            class="btn botonRojo"
            v-b-modal="modalId(i)"
            >Ver detalles</b-button
          >
        </div>

        <!--Modal con detalle de producto-->
        <b-modal
          :id="'modal' + i"
          size="xl"
          centered
          :title="data.nombre"
          hide-footer
        >
          <div id="modalContent" class="d-flex justify-content-center">
            <div class="mx-3">
              <img id="modalImg" :src="data.imagen.url" alt="Foto Producto" />
            </div>
            <div class="mx-3 d-flex flex-column">
              <div class="d-flex">
                <h4 class="my-3 mr-2" :class="{ tachado: data.oferta }">
                  $ {{ data.precio }}
                </h4>
                <h4 v-if="data.oferta" class="my-3" style="color: red">
                  $ {{ data.precio - data.ofertaMonto }}
                </h4>
              </div>
              <div v-if="data.estado" class="d-flex flex-column">
                <p>Selecciona la talla:</p>
                <b-form-select v-model="selectedSize" class="tallasSelector mb-3">
                  <b-form-select-option
                    v-for="({ talla, stock }, i) in data.tallas"
                    :key="i"
                    :value="talla"
                    :disabled="stock == 0"
                    >{{ talla }}</b-form-select-option
                  >
                </b-form-select>
              </div>
              <h4 v-if="!data.estado" style="color: red">Producto agotado</h4>
              <p id="parradoAlerta" v-show="!selectedSize && data.estado">
                Debes seleccionar una talla
              </p>
              <b-button
                v-if="data.estado"
                class="btn botonRojo"
                style="width: 110px"
                onmousedown="event.preventDefault()"
                :disabled="!selectedSize"
                @click="
                  addToCart(productId, i);
                  $bvModal.hide(modalId(i));
                  showSidebar();
                "
                aria-controls="sidebar-carrito"
                aria-expanded="sidebarActive"
                >Agregar <b-icon icon="cart-plus-fill"></b-icon></b-button
              ><br />
              <p><b>Detalle: </b>{{ data.detalle }}</p>
              <br />
            </div>
          </div>
        </b-modal>
      </b-card>
    </div>
    <!--Sidebar de carrito-->
    <b-sidebar
      v-model="sidebarActive"
      id="sidebar-carrito"
      title="Tu carro de compras"
      right
      shadow
    >
      <div class="px-3 py-2">
        <b-list-group>
          <b-list-group-item
            v-for="({ imagen: {url}, nombre, tallas, cantidad }, i) in carrito"
            :key="i"
            class="d-flex align-items-center"
          >
            <img style="width: 50px" :src="url" alt="foto producto" />
            <p class="mx-2">{{ nombre }}</p>
            <div style="width: 150px">
              <p>Talla: {{ tallas }}<br />En carro: {{ cantidad }}</p>
            </div>
          </b-list-group-item>
        </b-list-group>
        <!--Sidebar footer-->
        <template>
          <div class="d-flex bg-dark text-light align-items-center px-3 py-2">
            <b-button
              onmousedown="event.preventDefault()"
              class="btn botonRojo mx-auto"
              @click="goToCart"
              >Ir a comprar</b-button
            >
          </div>
        </template>
      </div>
    </b-sidebar>
  </div>
  </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ProductsGallery",
  data() {
    return {
      selectedSize: "",
      sidebarActive: false,
    };
  },
  props: {
    filtros: {
      type: Object,
    },
  },
  methods: {
    ...mapActions(["add_To_Cart", "aumentar_Carrito", "actualizarEstado"]),
    modalId(i) {
      return "modal" + i;
    },
    goToCart() {
      this.$router.push("carrito");
    },
    addToCart(idProducto, i) {
      const { selectedSize } = this;
      if (
        this.carrito.some(
          ({ id, tallas }) => id === idProducto && tallas === selectedSize
        )
      ) {
        return this.aumentar_Carrito(i);
      } else {
        const infoProducto = {
          id: idProducto,
          talla: selectedSize,
        };
        this.add_To_Cart(infoProducto);
        this.selectedSize = "";
      }
    },
    showSidebar() {
      this.sidebarActive = true;
    },
    hideSideBar() {
      this.sidebarActive = false;
    },
  },
  computed: {
    ...mapState(["productos", "carrito"]),
    productsToShow() {
      let { productos } = this;
      let {
        tematicaSeleccionada,
        tallaSeleccionada,
        filtroOfertaActivo,
        filtroPorNombre,
      } = this.filtros;
      tematicaSeleccionada != ""
        ? (productos = productos.filter(
            ({ data }) => data.tematica == tematicaSeleccionada
          ))
        : 0;
      tallaSeleccionada != ""
        ? (productos = productos.filter(({ data }) =>
            data.tallas.some(
              (t) => t.talla == tallaSeleccionada && t.stock != 0
            )
          ))
        : 0;
      filtroOfertaActivo
        ? (productos = productos.filter(({ data }) => data.oferta))
        : 0;
      filtroPorNombre != ""
        ? (productos = productos.filter(({ data }) => {
            //Se aplicaron métodos para pasar todo a mayuscula y omitir diacríticos como los acentos
            return data.nombre
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                filtroPorNombre
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              );
          }))
        : 0;
      return productos;
    },
  },
  created() {
    this.actualizarEstado();
  },
  beforeUpdate() {
    this.actualizarEstado();
  },
};
</script>

<style scoped>
.gris {
  color: #afb1b0;
}
.tachado {
  text-decoration: line-through;
}
#modalImg {
  max-width: 400px;
}
@media screen and (max-width: 993px) {
  #modalImg {
    max-width: 200px;
  }
}

@media screen and (max-width: 500px) {
  #modalContent {
    flex-direction: column;
  }
}

#productsGallery {
  width: 75%;
}

@media screen and (max-width: 1640px) {
#productsGallery {
  width: 80%;
}
}

@media screen and (max-width: 1460px) {
#productsGallery {
  width: 85%;
}
}

@media screen and (max-width: 1200px) {
#productsGallery {
  width: 90%;
}
}

@media screen and (max-width: 1000px) {
#productsGallery {
  width: 100%
}
}
</style>