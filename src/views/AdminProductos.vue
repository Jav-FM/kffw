<template>
  <div>
    <!--Titulo y boton Agregar-->
    <div class="d-flex flex-column align-items-center">
      <h2 class="mt-4 mb-2">Administrar productos</h2>

      <div id="buttons" class="d-flex">
        <b-button
          onmousedown="event.preventDefault()"
          class="btn botonNegro mr-2"
          @click="getProducts"
          >Actualizar productos</b-button
        >
        <ModalCrearProducto></ModalCrearProducto>
      </div>

      <div id="buscador" class="d-flex mt-4 align-items-end">
        <p class="mb-1 mr-2">Buscar:</p>
        <b-form-input
          size="sm"
          class="mr-sm-2"
          placeholder="Nombre Producto"
        ></b-form-input>
      </div>
    </div>

    <!--Tabla-->
    <div class="mx-5">
      <b-table
        class="my-5"
        responsive
        hover
        :fields="fields"
        :items="productsdata"
      >
        <template>
          <p>nombre</p>
        </template>
        <template>
          <p>stocktotal</p>
        </template>
        <template>
          <p>Precio</p>
        </template>
        <template>
          <p>Tematica</p>
        </template>

        <template #cell(estado)="data">
          <p v-if="data.item.estado">Disponible</p>
          <p v-else style="color: red">No disponible</p>
        </template>

        <template #cell(oferta)="data">
          <p v-if="data.item.oferta">Sí</p>
          <p v-else>No</p>
        </template>

        <template #cell(ofertaMonto)="data">
          <p v-if="data.item.ofertaMonto">{{ data.item.ofertaMonto }}</p>
          <p v-else>N/A</p>
        </template>

        <template #cell(imagen)="data">
          <img
            style="width: 100px"
            :src="data.item.imagen"
            alt="Imagen Producto"
          />
        </template>

        <template #cell(acciones)="data">
          <div>
            <ModalEditarProducto :id="data.item.id"></ModalEditarProducto>
            <ModalEliminarProducto :id="data.item.id"></ModalEliminarProducto>
            
          </div>
        </template>
      </b-table>
    </div>

  </div>
</template>

<script>
import ModalCrearProducto from "@/components/adminproductos/ModalCrearProducto";
import ModalEditarProducto from "@/components/adminproductos/ModalEditarProducto";
import ModalEliminarProducto from "@/components/adminproductos/ModalEliminarProducto";
import { mapState, mapActions } from "vuex";

export default {
  name: "Administrar",
  components: {
    ModalCrearProducto,
    ModalEditarProducto,
    ModalEliminarProducto
  },
  data() {
    return {
      items: ["1", "2", "3"],
      fields: [
        { key: "nombre", label: "Nombre" },
        { key: "stocktotal", label: "Stock Total" },
        { key: "precio", label: "Precio" },
        { key: "tematica", label: "Tematica" },
        { key: "estado", label: "Estado" },
        { key: "oferta", label: "Oferta" },
        { key: "ofertaMonto", label: "Monto Oferta" },
        { key: "imagen", label: "Imagen" },
        "Acciones",
      ],
    };
  },
  methods: {
    ...mapActions([
      "get_Products",
    ]),
    getProducts() {
      this.get_Products();
    },

  },
  computed: {
    ...mapState(["productos"]),
    productsdata() {
      return this.productos.map(({ data, id }) => {
        const stocktotal = +data.tallas.reduce((acc, { stock }) => {
          return acc + +stock;
        }, 0);
        let dataAMostrar = {...data}
        dataAMostrar.stocktotal = stocktotal;
        dataAMostrar.id = id;
        return dataAMostrar;
      });
    },
  },
  created() {
    this.get_Products();
  }
};
</script>

