<template>
  <div id="transbank" class="d-flex flex-column align-items-center pb-4 mb-5mx-2">
    <h2 class="mt-4 mb-5">Completa tus datos</h2>
    <div class="d-flex">
      <div id="kunfFuImg" class="mr-5 pr-4">
        <img
          style="width: 270px"
          src="../assets/kungFu1.png"
          alt="Kung Fu Img"
        />
      </div>
      <div class="mx-3">
        <b-form @submit="onSubmit">
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              :state="nameState"
              aria-describedby="input-1-feedback"
              placeholder="Nombre y apellido"
              required
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-feedback">
              Tu nombre y apellido son requeridos
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-2">
            <b-form-input
              id="input-2"
              v-model="form.email"
              type="email"
              :state="emailState"
              aria-describedby="input-2-feedback"
              placeholder="Correo"
              required
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-feedback">
              Tu correo es requerido
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group id="input-group-3">
            <b-form-input
              id="input-3"
              v-model="form.number"
              type="number"
              :state="numberState"
              placeholder="Teléfono"
              aria-describedby="input-3-feedback"
              required
            ></b-form-input>
            <b-form-invalid-feedback id="input-1-feedback">
              Tu teléfono es requerido
            </b-form-invalid-feedback>
          </b-form-group>

          <b-form-group 
          id="input-group-4"
          description="*Recuerda que si no estás en Santiago, deberás pagar el costo de envío contra entrega.">
            <b-form-input
              id="input-4"
              v-model="form.adress"
              :state="adressState"
              aria-describedby="input-4-feedback"
              placeholder="Dirección"
              required
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-4-feedback">
              Tu dirección es requerida
            </b-form-invalid-feedback>
          </b-form-group>


          <div class="d-flex justify-content-center align-items-center">
              <h4>Monto: ${{montoPago.toLocaleString()}}</h4>
                <b-button
              type="submit"
              class="botonRojo mx-3"
              >Pagar con Webpay</b-button
            >
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

   

<script>
import { mapActions, mapState } from 'vuex';

export default {
    data() {
        return{
            form: {
                name: "",
                email: "",
                number: "",
                adress: "",
            },
        }
    },
    methods: {
        ...mapActions(["guardar_Venta"]),
        onSubmit(event) {
        event.preventDefault();
        this.goToTransbank();
        },
        onReset() {
        this.form.name = "";
            this.form.email = "";
            this.form.number = "";
            this.form.adress = "";
        },
        goToTransbank() {
          //A futuro debería incluir una re-revisión de stock antes del pago
            const { montoPago } = this;
            const buyOrder = "ordencompra" + Math.floor(Math.random() * 99999999);
            let thisDate = new Date();
            let fechaDeHoy = `${thisDate.getDate()}-${thisDate.getMonth()+1}-${thisDate.getFullYear()}`
            const ventaNueva = {
                montoPago: montoPago,
                ordenPago: buyOrder,
                comprador: {
                    nombre: this.form.name,
                    correo: this.form.email,
                    telefono: this.form.number,
                    direccion: this.form.adress
                 },
                fecha: fechaDeHoy,
            }
            this.guardar_Venta(ventaNueva);
            window.location = `https://kffwserver.herokuapp.com/api/v1/tbk/?montoPago=${montoPago}&buyOrder=${buyOrder}`
            //Server arriba: https://kffwserver.herokuapp.com/
            //Server local:http://localhost:5000/
        }
    },
    computed: {
        ...mapState(["montoPago"]),
        nameState() {
            return this.form.name.length > 2 ? true : false;
        },
        emailState() {
            return this.form.email.length > 3 ? true : false;
        },
        adressState() {
            return this.form.adress.length > 6 ? true : false;
        },
        numberState() {
            return this.form.number.length > 6 ? true : false;
        },
    },
}
</script>

<style scoped>
#transbank {
height: 100%;
margin-bottom: 70px;
}

@media screen and (max-width: 580px) {
  #kunfFuImg {
    display: none;
  }
}
</style>
