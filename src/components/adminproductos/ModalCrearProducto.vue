<template>
  <div>
    <b-button
      onmousedown="event.preventDefault()"
      class="btn botonRojo"
      @click="showModal"
      >Agregar nuevo producto</b-button
    >
    <b-modal
      ref="create-product-modal"
      hide-footer
      title="Agregando Producto"
      size="xl"
    >
      <div class="d-block px-5">
        <!--Nombre-->
        <b-form-group id="input-group-1" label="Nombre:" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="nuevoProducto.nombre"
            type="text"
            placeholder="Ej: Polera Panda"
            required
          ></b-form-input>
        </b-form-group>

        <!--Tallas-->
        <b-form-group
          id="input-group-2"
          label="Stock por talla:"
          label-for="input-2"
        >
          <div
            class="d-flex align-items-center justify-content-between flex-wrap"
          >
            <div class="d-flex align-items-center">
              <p class="m-0">s:</p>
              <b-form-input
                v-model="nuevoProducto.tallas[0].stock"
                type="number"
                required
                class="mx-3"
                style="width: 70px"
              ></b-form-input>
            </div>
            <div class="d-flex align-items-center">
              <p class="m-0">m:</p>
              <b-form-input
                v-model="nuevoProducto.tallas[1].stock"
                type="number"
                required
                class="mx-3"
                style="width: 70px"
              ></b-form-input>
            </div>
            <div class="d-flex align-items-center">
              <p class="m-0">l:</p>
              <b-form-input
                v-model="nuevoProducto.tallas[2].stock"
                type="number"
                required
                class="mx-3"
                style="width: 70px"
              ></b-form-input>
            </div>
            <div class="d-flex align-items-center">
              <p class="m-0">cl:</p>
              <b-form-input
                v-model="nuevoProducto.tallas[3].stock"
                type="number"
                required
                class="mx-3"
                style="width: 70px"
              ></b-form-input>
            </div>
          </div>
        </b-form-group>

        <!--Detalle-->
        <b-form-group id="input-group-2" label="Detalle:" label-for="input-2">
          <b-form-textarea
            id="input-2"
            v-model="nuevoProducto.detalle"
            type="text"
            placeholder="Ej: Polera con estampado de panda...."
            required
          ></b-form-textarea>
        </b-form-group>

        <!--Temática-->
        <b-form-group id="input-group-6" label="Temática:" label-for="input-6">
          <b-form-select v-model="nuevoProducto.tematica">
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
            v-model="nuevoProducto.precio"
            type="number"
            required
          ></b-form-input>
        </b-form-group>

        <!--Oferta-->
        <b-form-group id="input-group-4" label="Oferta:" label-for="input-4">
          <b-form-select v-model="nuevoProducto.oferta">
            <b-form-select-option type="boolean" :value="true"
              >Sí</b-form-select-option
            >
            <b-form-select-option type="boolean" :value="false"
              >No</b-form-select-option
            >
          </b-form-select>
        </b-form-group>

        <!--Oferta-monto-->
        <div v-if="nuevoProducto.oferta">
          <b-form-group
            id="input-group-5"
            label="Monto a Descontar:"
            label-for="input-5"
          >
            <b-form-input
              id="input-5"
              v-model="nuevoProducto.ofertaMonto"
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
            v-model="nuevoProducto.imagen"
            type="text"
            placeholder="Ej: http://ejemplo.imagen.jpg"
            required
          ></b-form-input>
          <div
            class="d-flex justify-content-center align-items-center my-2"
            v-if="nuevoProducto.imagen"
          >
            <p>Tu imagen:</p>
            <img
              id="imagenDePrueba"
              :src="nuevoProducto.imagen"
              alt="Imagen Producto"
            />
          </div>
        </b-form-group>
      </div>
      <div class="buttons d-flex justify-content-center">
        <b-button @click="sendNewProduct" class="btn botonNegro m-2"
          >Agregar</b-button>
        <b-button class="btn botonRojo m-2" @click="hideModal">Cancelar</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: "ModalCrearProducto",
  data() {
    return {
      nuevoProducto: {
        nombre: "",
        tallas: [
          { talla: "s", stock: 0 },
          { talla: "m", stock: 0 },
          { talla: "l", stock: 0 },
          { talla: "xl", stock: 0 },
        ],
        precio: 0,
        detalle: "",
        estado: true,
        oferta: false,
        ofertaMonto: 0,
        imagen: "",
        tematica: "",
      },
    };
  },
  methods: {
    sendNewProduct() {
      const {
        nombre,
        precio,
        detalle,
        oferta,
        ofertaMonto,
        imagen,
        tematica,
        tallas,
      } = this.nuevoProducto;
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
      } else if (
        tallas.reduce((acc, { stock }) => {
          return acc + +stock;
        }, 0) == 0
      ) {
        this.nuevoProducto.estado = false;
      } else {
        this.$emit("getNewProduct", this.nuevoProducto);
        this.nuevoProducto = {
          nombre: "",
          tallas: [
            { talla: "s", stock: 0 },
            { talla: "m", stock: 0 },
            { talla: "l", stock: 0 },
            { talla: "xl", stock: 0 },
          ],
          precio: 0,
          detalle: "",
          estado: true,
          oferta: false,
          ofertaMonto: 0,
          imagen: "",
          tematica: "",
        };
        this.hideModal();
      }
    },
    showModal() {
      this.$refs["create-product-modal"].show();
    },
    hideModal() {
      this.$refs["create-product-modal"].hide();
    },
  },
};
</script>

<style scoped>
#imagenDePrueba {
  width: 100px;
}
</style>