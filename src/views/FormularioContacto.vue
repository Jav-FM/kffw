<template>
  <div class="d-flex flex-column align-items-center pb-4 mb-5">
    <h2 class="mt-4 mb-5">Formulario de contacto</h2>
    <div class="d-flex">
      <div id="kunfFuImg" class="mr-5 pr-4">
        <img
          style="width: 270px"
          src="../assets/kungFu1.png"
          alt="Kung Fu Img"
        />
      </div>
      <div>
        <b-form @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-1">
            <b-form-input
              id="input-1"
              v-model="form.name"
              :state="nameState"
              aria-describedby="input-1-feedback"
              placeholder="Nombre"
              trim
            ></b-form-input>

            <b-form-invalid-feedback id="input-1-feedback">
              Tu nombre es requerido
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

          <b-form-group id="input-group-3">
            <b-form-textarea
              id="text-area"
              v-model="form.message"
              placeholder="Mensaje"
              :state="messageState"
              aria-describedby="text-area-feedback"
              required
            ></b-form-textarea>
            <b-form-invalid-feedback id="input-1-feedback">
              Debes escribir un mensaje
            </b-form-invalid-feedback>
          </b-form-group>
          <div class="d-flex justify-content-center">
            <b-button
              type="submit"
              class="botonNegro mx-1"
              @click="enviarCorreo"
              >Enviar</b-button
            >
            <b-button type="reset" class="botonRojo mx-1">Limpiar</b-button>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        email: "",
        number: "",
        message: "",
      },
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      this.onReset;
    },
    onReset(event) {
      event.preventDefault();
      this.form.name = "";
      this.form.email = "";
      this.form.number = "";
      this.form.message = "";
    },
    async enviarCorreo() {
      await axios.post("http://localhost:3000/mail", {
        to: "nodemailerADL@gmail.com",
        subject: "Hola! de Javi desde Vue",
        params: {
          nombre: this.form.name,
          correo: this.form.email,
          telefono: this.form.number,
          mensaje: this.form.message,
        },
      });
      this.form.name = "";
      this.form.email = "";
      this.form.number = "";
      this.form.message = "";
    },
  },
  computed: {
    nameState() {
      return this.form.name.length > 2 ? true : false;
    },
    emailState() {
      return this.form.email.length > 3 ? true : false;
    },
    messageState() {
      return this.form.message.length > 6 ? true : false;
    },
    numberState() {
      return this.form.number.length > 6 ? true : false;
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 580px) {
  #kunfFuImg {
    display: none;
  }
}
</style>