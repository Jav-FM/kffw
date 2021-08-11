<template>
  <div>
    <!--Titulo y botones iniciales-->
    <div id="inicioAdmin" class="d-flex flex-column align-items-center">
      <div class="d-flex align-items-center">
        <h2 class="mt-4 mb-3 mx-2">Administrador de Productos</h2>
        <router-link to="/adminventas"><b-button class="botonNegro">IR A VENTAS</b-button></router-link>
      </div>
      <div id="buttons" class="d-flex">
        <ModalCrearProducto></ModalCrearProducto>
      </div>

      <!--Buscador-->
      <div id="buscador" class="d-flex mt-2 align-items-end">
        <p class="mb-1 mr-2">Buscar:</p>
        <b-form-input
          id="busquedaInput"
          size="sm"
          class="mr-sm-2"
          placeholder="Nombre Producto"
          v-model="nombreBuscado"
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
        :items="productsData"
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
          <p v-if="+data.item.ofertaMonto != 0">{{ data.item.ofertaMonto }}</p>
          <p v-else>N/A</p>
        </template>

        <template #cell(imagen)="data">
          <img
            style="width: 100px"
            :src="data.item.imagen.url"
            alt="Imagen Producto"
          />
        </template>

        <template #cell(acciones)="data">
          <div class="d-flex">
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
  name: "AdminProductos",
  components: {
    ModalCrearProducto,
    ModalEditarProducto,
    ModalEliminarProducto,
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
      nombreBuscado: "",
    };
  },
  methods: {
    ...mapActions(["get_Products", "actualizarEstado"]),
  },
  computed: {
    ...mapState(["productos"]),
    productsData() {
      let { productos, nombreBuscado } = this;
      productos = productos.map(({ data, id }) => {
        const stocktotal = +data.tallas.reduce((acc, { stock }) => {
          return acc + +stock;
        }, 0);
        let dataAMostrar = { ...data };
        dataAMostrar.stocktotal = stocktotal;
        dataAMostrar.id = id;
        return dataAMostrar;
      });
      nombreBuscado = !""
        ? (productos = productos.filter(({ nombre }) =>
            nombre
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "")
              .includes(
                nombreBuscado
                  .toLowerCase()
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
              )
          ))
        : 0;
      return productos;
    },
  },
  created() {
    this.actualizarEstado();
    this.get_Products();
  },
  beforeUpdate() {
    this.actualizarEstado();
  },
};
</script>
