<template>
  <div>
    <!--Titulo y botones iniciales-->
    <div id="inicioAdmin" class="d-flex flex-column align-items-center">
      <div class="cabecera d-flex align-items-center">
        <h2 class="mt-4 mb-3 mx-2">Lista de Ventas</h2>
        <router-link to="/adminproductos"><b-button class="botonNegro">IR A PRODUCTOS</b-button></router-link>
      </div>

      <!--Buscador-->
      <div id="buscador" class="d-flex my-3 align-items-end">
        <p class="mb-1 mr-2">Fecha:</p>
        <b-form-input
          id="fechaInput"
          size="sm"
          class="mr-sm-2"
          type="date"
          v-model="fechaBuscada"
        ></b-form-input>
        <b-button onmousedown="event.preventDefault()" class="btn botonRojo" @click="todasLasFechas">Todas</b-button>
      </div>
    </div>

    <!--Ventas-->
    <div class="mx-3 d-flex flex-wrap justify-content-center mb-5 pb-3" >
    <b-card v-for="({data}, i) in ventasFiltradas" :key="i" no-body class="overflow-hidden m-1 border-danger" style="width: 700px;">
    <b-row no-gutters>
      <b-col md="4">
        <div class="card-header text-danger" style="font-size: 20px;">Compra</div>
        <b-card-body class="cardBody">
          <b-card-text>
            <p><b>Fecha:</b> {{data.fecha}}</p>
            <p><b>Orden de pago:</b> {{data.ordenPago}}</p>
            <p><b>Monto total:</b> ${{data.montoPago.toLocaleString()}}</p>
          </b-card-text>
        </b-card-body>
      </b-col>

      <b-col md="4">
        <div class="card-header text-danger" style="font-size: 20px;">Cliente/a</div>
        <b-card-body class="cardBody">
          <b-card-text>
            <p><b>Nombre:</b> {{data.comprador.nombre}}</p>
            <p><b>Teléfono:</b> {{data.comprador.telefono}}</p>
            <p><b>Correo:</b> {{data.comprador.correo}}</p>
            <p><b>Dirección:</b> {{data.comprador.direccion}}</p>
          </b-card-text>
        </b-card-body>
      </b-col>

      <b-col md="4">
        <div class="card-header text-danger" style="font-size: 20px;">Productos</div>
        <b-card-body class="cardBody">
          <b-card-text>
              <div v-for="({nombre, tallas, precio, oferta, ofertaMonto}, j) in data.productos" :key="j" class="d-flex flex-column mb-3">
                            <p class="mb-0"><b>{{nombre}}</b></p> 
                            <p class="mb-0">talla {{tallas}}</p> 
                            <span v-if="oferta">Precio oferta: {{precio-ofertaMonto}}</span> 
                            <span v-else>precio: ${{ precio }}</span>
              </div>
          </b-card-text>
        </b-card-body>
      </b-col>

    </b-row>
  </b-card>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "AdminVentas",
  data() {
    return {
      fechaBuscada: ""
    };
  },
  methods: {
    ...mapActions(["get_Sales"]),
    todasLasFechas() {
      this.fechaBuscada = "";
    }
  },
  computed: {
    ...mapState(["ventas"]),
    ventasFiltradas() {
      //Acá cambié la fecha de mis ventas a formato gringo
      // let ventasParaOrdenar = this.ventas.map(v => {
      //   let nuevaFecha = v.data.fecha.split("-").reverse().join(",")
      //   v.data.fecha = nuevaFecha
      //   console.log("Fecha para ordenar:" + v.data.fecha)
      //   return v;
      // })
      //acá ordeno las ventas por fecha (igual me tira octubre para el final)
      // let ventasOrdenadas = this.ventas.sort((a, b) => a.data.createdAt < b.data.createdAt)
      // map(v => {
      //    let nuevaFecha = v.data.fecha.split(",").reverse().join("-")
      //   v.data.fecha = nuevaFecha
      //   console.log("Fecha despues:" + v.data.fecha)
      //   return v;
      // })
     //Acá adapto la fecha que me entrega el calendario y aplico mi filtro (esto ya funciona)
      if(this.fechaBuscada) {
        const fechaAdaptada = this.fechaBuscada.split("-").reverse().map(n => {
          let arrayOfNumbers = n.split("");
          if (arrayOfNumbers[0] === "0") {
            return arrayOfNumbers.pop();
          }
          return arrayOfNumbers.join("");
        }).join("-");
        return this.ventas.filter(({data}) => data.fecha == fechaAdaptada)
      } else {
        return this.ventas;
      }
    }
  },
  created() {
    this.get_Sales();
  }
};
</script>

<style scoped>
@media screen and (max-width: 530px) {
  .cabecera {
    flex-direction: column;
    margin-bottom: 20px;
  }
}
</style>
