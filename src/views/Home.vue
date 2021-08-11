<template>
<div>
  <div class="d-flex flex-column align-items-center">
    <Banner />

    <!--Navbar de Productos-->
    <div id="productosNav" class="container-fluid p-0">
      <b-navbar type="dark" style="background-color: black" toggleable="lg">
        <div class="container">
          <b-navbar-brand class="align-self-center">
            <h4>Buscar productos</h4>
          </b-navbar-brand>

          <b-navbar-toggle target="navcat-collapse"></b-navbar-toggle>
          <b-collapse id="navcat-collapse" is-nav>
            <b-navbar-nav>
              <!-- Navbar dropdowns -->
              <b-nav-item-dropdown text="Temática">
                <b-dropdown-item @click="applyTematicFilter('frases')"
                  >Frases Motivacionales</b-dropdown-item
                >
                <b-dropdown-item @click="applyTematicFilter('animales')"
                  >Animales</b-dropdown-item
                >
                <b-dropdown-item @click="applyTematicFilter('formas')"
                  >Formas</b-dropdown-item
                >
                <b-dropdown-item @click="applyTematicFilter('otros')"
                  >Otros</b-dropdown-item
                >
                <b-dropdown-item @click="discardFilters('tematica')"
                  >Todas las temáticas</b-dropdown-item
                >
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Talla" v-model="tallaSeleccionada">
                <b-dropdown-item @click="applySizeFilter('s')"
                  >S</b-dropdown-item
                >
                <b-dropdown-item @click="applySizeFilter('m')"
                  >M</b-dropdown-item
                >
                <b-dropdown-item @click="applySizeFilter('l')"
                  >L</b-dropdown-item
                >
                <b-dropdown-item @click="applySizeFilter('xl')"
                  >XL</b-dropdown-item
                >
                <b-dropdown-item @click="discardFilters('talla')"
                  >Todas las tallas</b-dropdown-item
                >
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Ofertas" v-model="filtroOfertaActivo">
                <b-dropdown-item @click="applyOfertFilter()"
                  >Productos en oferta</b-dropdown-item
                >
                <b-dropdown-item @click="discardFilters('oferta')"
                  >Todos los productos</b-dropdown-item
                >
              </b-nav-item-dropdown>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-navbar-brand class="align-self-stars">
                <h4>Por nombre</h4>
              </b-navbar-brand>
              <b-nav-form id="buscador">
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Nombre Producto"
                  v-model="filtroPorNombre"
                  @keyup="applyNameFilter"
                ></b-form-input>
              </b-nav-form>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </div>

    <FiltrosAplicados
      v-if="activeFilters"
      :filtros="{ tematicaSeleccionada, tallaSeleccionada, filtroOfertaActivo, filtroPorNombre }"
      @eliminarFiltros="eliminarFiltros" @eliminarFiltro="discardFilters($event)"
    />

    <ProductsGallery
      :filtros="{
        tematicaSeleccionada,
        tallaSeleccionada,
        filtroOfertaActivo,
        filtroPorNombre,
      }"
    />
  </div>
</div>
</template>

<script>
import Banner from "@/components/home/Banner";
import FiltrosAplicados from "@/components/home/FiltrosAplicados";
import ProductsGallery from "@/components/home/ProductsGallery";
import { mapActions, mapState } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      activeFilters: false,
      tematicaSeleccionada: "",
      tallaSeleccionada: "",
      filtroOfertaActivo: false,
      filtroPorNombre: "",
    };
  },
  components: {
    Banner,
    FiltrosAplicados,
    ProductsGallery,
  },
  methods: {
    ...mapActions(["get_Products"]),
    goToCart() {
      this.$router.push("carrito");
    },
    applyTematicFilter(tematica) {
      this.tematicaSeleccionada = tematica;
      this.detectActiveFilters();
    },
    applySizeFilter(talla) {
      this.tallaSeleccionada = talla;
      this.detectActiveFilters();
    },
    applyOfertFilter() {
      this.filtroOfertaActivo = true;
      this.detectActiveFilters();
    },
    applyNameFilter() {
      this.detectActiveFilters();
    },
    discardFilters(filtro) {
      filtro == "tematica"
        ? (this.tematicaSeleccionada = "")
        : filtro == "talla"
        ? (this.tallaSeleccionada = "")
        : filtro == "oferta"
        ? (this.filtroOfertaActivo = false)
        : filtro == "nombre"
        ? (this.filtroPorNombre = "")
        : 0;
      this.detectActiveFilters();
    },
    detectActiveFilters() {
      if (
        this.tematicaSeleccionada != "" ||
        this.tallaSeleccionada != "" ||
        this.filtroOfertaActivo == true ||
        this.filtroPorNombre != "" 
      ) {
        this.activeFilters = true;
      } else {
        this.activeFilters = false;
      }
    },
    eliminarFiltros() {
      this.tematicaSeleccionada = "";
      this.tallaSeleccionada = "";
      this.filtroOfertaActivo = false;
      this.filtroPorNombre = "";
      this.detectActiveFilters();
    },
  },
  computed: {
    ...mapState(["carrito, productos"]),
    detectIfNameFilterIsActive() {
      if (filtroPorNombre != "") return (this.activeFilters = true);
    },

  },
  created() {
    this.get_Products();
  },
  beforeUpdate() {
    this.get_Products();
  },
};
</script>

<style scoped>
#filters {
  background-color: black;
  color: white;
}
#cartIcon :hover {
  cursor: pointer;
}
#productosNav {
  position: sticky;
  top: 0px;
  z-index: 1;
}

@media screen and (max-width: 994px) {
  #buscador {
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    margin-bottom: 10px;
    margin-top: 10px;
  }
  #cartIcon {
    margin-left: 0px;
  }
}

@media screen and (min-width: 995px) {
  #cartIcon {
    margin-left: 5px;
  }
}
</style>