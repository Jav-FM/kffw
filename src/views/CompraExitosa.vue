<template>
    <div id="fondo">
    <div id="compraRechazada" class="container d-flex flex-column align-items-center pt-5">
        <h1 class="mt-3 mb-3">Compra exitosa</h1>
        <div class="my-4">
        <p>¡Muchas gracias por tu compra!</p>
        <p>Hemos recibido tu pago con éxito. Nuestro equipo se pondrá en contacto contigo en las próximas 24 horas para coordinar la entrega de tus productos.</p>
        </div>
    </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';

export default {
    methods: {
        ...mapActions(["add_Sale"])
    },
    mounted() {
        this.add_Sale();
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