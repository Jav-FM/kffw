<template>
  <div class="d-flex flex-column align-items-center">
    <h2 class="mt-4 mb-2">Login</h2>
    <p>(Sección para administradores)</p>

    <div class="d-flex">
      <div>
        <b-form class="container" @submit="singIn" @reset="onReset">
          <b-form-group id="input-group-1" label="Email:" label-for="input-1">
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              placeholder="Correo"
              required
            ></b-form-input>
          </b-form-group>

          <b-form @submit.stop.prevent>
            <label for="text-password">Password</label>
            <b-form-input
              v-model="password"
              type="password"
              placeholder="Password"
              id="text-password"
              aria-describedby="password-help-block"
            ></b-form-input>
          </b-form>

          <b-button type="submit" class="botonNegro m-2">Ingresar</b-button>
          <b-button type="reset" class="botonRojo m-2" @click="deleteInfo"
            >Limpiar</b-button
          >
        </b-form>
      </div>
      <div id="kunfFuImgLogin" class="ml-5">
        <img
          style="width: 270px"
          src="../assets/kungFu2.png"
          alt="Kung Fu Img"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["sing_In"]),
    async singIn(event) {
      event.preventDefault();
      const { email, password } = this;
      try {
        this.sing_In({ email, password });
      } catch (e) {
        alert(e);
      }
    },
    onReset(event) {
      event.preventDefault();
      this.form.name = "";
      this.form.password = "";
    },
    deleteInfo() {
      this.email = "";
      this.password = "";
    },
  },
};
</script>

<style scoped>
@media screen and (max-width: 550px) {
  #kunfFuImgLogin {
    display: none;
  }
}
</style>