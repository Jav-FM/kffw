<template>
  <div class="d-flex flex-column align-items-center">
    <Banner />

  <!--Navbar de Productos-->
    <div id="productosNav" class="container-fluid p-0">
      <b-navbar type="dark" style="background-color: black" toggleable="lg">
        <div class="container">
          <b-navbar-brand class="align-self-center">
            <h4>Productos</h4>
          </b-navbar-brand>

          <b-navbar-toggle target="navcat-collapse"></b-navbar-toggle>
          <b-collapse id="navcat-collapse" is-nav>
            <b-navbar-nav>
              <!-- Navbar dropdowns -->
              <b-nav-item-dropdown text="Categoría 1">
                <b-dropdown-item>...</b-dropdown-item>
                <b-dropdown-item>...</b-dropdown-item>
                <b-dropdown-item>...</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Categoría 2">
                <b-dropdown-item>...</b-dropdown-item>
                <b-dropdown-item>...</b-dropdown-item>
                <b-dropdown-item>...</b-dropdown-item>
              </b-nav-item-dropdown>

              <b-nav-item-dropdown text="Categoría 3">
                <b-dropdown-item>...</b-dropdown-item>
                <b-dropdown-item>...</b-dropdown-item>
                <b-dropdown-item>...</b-dropdown-item>
              </b-nav-item-dropdown>
            </b-navbar-nav>

            <!-- Right aligned nav items -->
            <b-navbar-nav class="ml-auto">
              <b-nav-form id="buscador">
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Nombre Producto"
                ></b-form-input>
                <b-button onmousedown="event.preventDefault()" size="sm" class="btn btnBuscar my-2 my-sm-0 botonRojo"
                  >Buscar</b-button
                >
              </b-nav-form>

              <div class="mx-2">
                <b-icon
                  icon="cart-fill"
                  variant="light"
                  font-scale="1.5"
                  id="cartIcon"
                  @click="goToCart"
                ></b-icon>
                <b-badge pill variant="danger">{{getCartNumber}}</b-badge>
              </div>
            </b-navbar-nav>
          </b-collapse>
        </div>
      </b-navbar>
    </div>

    <ProductsGallery />
  </div>
</template>

<script>
import Banner from "@/components/home/Banner";
import ProductsGallery from "@/components/home/ProductsGallery";
import { mapActions, mapGetters, mapState } from 'vuex';

export default {
  name: "Home",
  components: {
    Banner,
    ProductsGallery,
  },
  methods: {
    ...mapActions(["get_Products"]),
    goToCart() {
      this.$router.push("carrito")
    },
  },
  computed: {
    ...mapState(["carrito"]),
    ...mapGetters(["getCartNumber"]),
  },
  created() {
    this.get_Products();
  }
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
  z-index: 1
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