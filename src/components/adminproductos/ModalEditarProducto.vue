<template>
  <div>
    <b-icon
      style="cursor: pointer"
      class="h4 mx-1"
      icon="pencil-fill"
      variant="success"
      @click="prepareModalToEdit()"
    ></b-icon>

    <b-modal
      ref="editing-product-modal"
      hide-footer
      :title="`Edición de Producto`"
      size="xl"
    >
      <div class="d-block px-5">
        <!--Nombre-->
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="productoAEditar.nombre"
            type="text"
            required
          ></b-form-input>
        </b-form-group>

        <!--Tallas-->
        <b-form-group
          id="input-group-2"
          label="Stock por talla:"
          label-for="input-2"
        >
          <div  class="d-flex align-items-center justify-content-between flex-wrap">
            <div v-for="({talla}, i) in productoAEditar.tallas" :key="i" class="d-flex align-items-center">
            <p class="m-0">{{talla}}:</p>
            <b-form-input
              v-model="productoAEditar.tallas[i].stock"
              type="number"
              required
              class="mx-3"
              style="width: 70px;"
            ></b-form-input>
            </div>
          </div>
        </b-form-group> -->

        <!--Detalle-->
        <b-form-group v-if="productoAEditar" id="input-group-2" label="Detalle:" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="productoAEditar.detalle"
            type="text"
            required
          ></b-form-textarea>
        </b-form-group>

        <!--Temática-->
        <b-form-group id="input-group-6" label="Temática:" label-for="input-6">
          <b-form-select v-model="productoAEditar.tematica">
            <b-form-select-option value="frases"
              >Fraces Motivacionales</b-form-select-option
            >
            <b-form-select-option value="formas">Formas</b-form-select-option>
            <b-form-select-option value="animales"
              >Animales</b-form-select-option
            >
            <b-form-select-option value="otros">Otros</b-form-select-option>
          </b-form-select>
        </b-form-group>

        <!--Precio-->
        <b-form-group id="input-group-3" label="Precio:" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="productoAEditar.precio"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <!--Oferta-->
        <b-form-group id="input-group-4" label="Oferta:" label-for="input-4">
          <b-form-select v-model="productoAEditar.oferta">
            <b-form-select-option type="boolean" :value="true"
              >Sí</b-form-select-option
            >
            <b-form-select-option type="boolean" :value="false"
              >No</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <!--Oferta-monto-->
        <div v-if="productoAEditar.oferta">
          <b-form-group
            id="input-group-5"
            label="Monto a Descontar:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="productoAEditar.ofertaMonto"
              type="number"
              required
            ></b-form-input>
          </b-form-group>
        </div>

        <!--Imagen-->
        <b-form-group
          id="input-group-6"
          label="Url imagen:"
          label-for="input-6"
        >
          <b-form-input
            id="input-6"
            v-model="productoAEditar.imagen"
            type="text"
            required
          ></b-form-input>
          <div
            class="d-flex justify-content-center align-items-center my-2"
            v-if="productoAEditar.imagen"
          >
            <p>Tu imagen:</p>
            <img
              id="imagenDePrueba"
              :src="productoAEditar.imagen"
              alt="Imagen Producto"
              style="width: 100px;"
            />
          </div>
        </b-form-group>
      </div>
      <div class="buttons d-flex justify-content-center">
        <b-button  class="btn botonNegro m-2" @click="updateProduct"
          >Editar</b-button
        >
        <b-button class="btn botonRojo m-2" @click="hideModal">Cancelar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  name: "ModalEditarProducto",
  data() {
    return {
      productoAEditar: {
        data: {},
        id: "",
      },
    };
  },
  props: {
    id: String,
  },
  methods: {
    ...mapActions(["update_Product"]),
    prepareModalToEdit() {
      let productoSeleccionado = {};
      this.productos.map((p) => {
      if(p.id === this.id) productoSeleccionado = p;
      });
      this.productoAEditar = { ...productoSeleccionado.data };
      this.$refs["editing-product-modal"].show();
    },
    updateProduct() {
    const { nombre, precio, detalle, oferta, ofertaMonto, imagen, tematica, tallas } =
        this.productoAEditar;
      if (
        nombre == "" ||
        precio == 0 ||
        detalle == "" ||
        imagen == "" ||
        tematica == ""
      ) {
        alert("Debes completar todos los campos.");
      } else if (oferta && ofertaMonto == 0) {
        alert(
          "Si el producto está en oferta, debes indicar el monto de descuento."
        );
      } else if (oferta && ofertaMonto >= precio) {
        alert("El descuento por oferta debe ser inferior al precio original.");
      } else {
        if (tallas.reduce((acc, {stock}) => {return acc+ +stock},0) == 0) {
        this.productoAEditar.estado = false;
        }
        const {productoAEditar} = this
        const producto = {data: productoAEditar, id: this.id}
        this.update_Product(producto);
        this. productoAEditar = {
        data: {},
        id: "",
        }
        this.hideModal();
      }
    },
    hideModal() {
        this.$refs["editing-product-modal"].hide();
    }
  },
  computed: {
    ...mapState(["productos"]),
  },
};
</script>
