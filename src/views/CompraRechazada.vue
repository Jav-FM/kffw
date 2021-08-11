<template>
<div id="fondo">
    <div id="compraRechazada" class="container d-flex flex-column align-items-center pt-5">
        <h1 class="mt-3 mb-3">Compra rechazada</h1>
        <p>Algo salió mal en tu proceso de pago.</p>
        <div class="my-4">
            <b-button class="botonRojo mx-1" @click="reintentar">Reintentar</b-button>
            <b-button class="botonNegro mx-1" @click="regresar">Regresar a vista de pago</b-button>
        </div>
        <!-- <img src="../assets/banner.jpg" alt="imagen" style="width: 100%"> -->
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    methods: {
        regresar() {
            this.$router.push('/transbank')
        },
        reintentar() {
            const {montoPago, ordenPago} = this.ventaActual;
            window.location = `http://localhost:5000/api/v1/tbk/?montoPago=${montoPago}&buyOrder=${ordenPago}`
        }
    },
    computed: {
        ...mapState(["ventaActual"]),
    }
}
</script>

<style scoped>
#fondo {
    width: 100vw;
    height: 100vh;
    background-image: url("../assets/fondo.jpg");
    background-position-y: center;
    background-repeat: no-repeat;
    background-size: cover
}
</style>