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
              <b-nav-form>
                <b-form-input
                  size="sm"
                  class="mr-sm-2"
                  placeholder="Nombre Producto"
                ></b-form-input>
                <b-button onmousedown="event.preventDefault()" size="sm" class="btn my-2 my-sm-0 botonRojo"
                  >Buscar</b-button
                >
              </b-nav-form>

              <div class="mx-2">
                <b-icon
                  icon="cart-fill"
                  variant="light"
                  font-scale="1.5"
                  class="ml-2"
                  id="cartIcon"
                  @click="goToCart"
                ></b-icon>
                <b-badge pill variant="danger">0</b-badge>
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

export default {
  name: "Home",
  components: {
    Banner,
    ProductsGallery,
  },
  methods: {
    goToCart() {
      this.$router.push("carrito")
    }
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
</style>