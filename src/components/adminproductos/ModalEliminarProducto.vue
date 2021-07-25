<template>
  <div>
    <b-icon
      style="cursor: pointer"
      class="h4 mx-1"
      icon="trash-fill"
      variant="danger"
      @click="showModal()"
    ></b-icon>

    <b-modal ref="delete-course-modal" hide-footer>
      <div class="d-block">
        <p>
          ¿Estás seguro de que quieres eliminar el producto
          <b>{{this.getProductName}}</b>?
        </p>
      </div>
      <b-button @click="deleteProduct()" class="btn botonNegro m-2"
        >Eliminar</b-button
      >
      <b-button class="btn botonRojo m-2" @click="hideModal"
        >Cancelar</b-button
      >
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: "ModalEliminarProducto",
  props: {
    id: String,
  },
  methods: {
    ...mapActions(["delete_Product"]),
    hideModal() {
        this.$refs["delete-course-modal"].hide();
    },
    showModal() {
        this.$refs["delete-course-modal"].show();
    },
    deleteProduct() {
        this.delete_Product(this.id);
        this.hideModal();
    },
  },
  computed: {
    ...mapState(["productos"]),
    getProductName() {
        let producto = this.productos.filter(p => p.id === this.id);
        return producto[0].data.nombre
    },
  }
};
</script>
