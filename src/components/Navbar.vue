<template>
  <div id="navBar">
    <b-navbar
      class="d-flex align-items-center"
      toggleable="lg"
      type="dark"
      style="background-color: black"
    >
      <div class="d-flex align-items-center justify-content-start">
        <img
          id="navbar_image"
          src="../assets/logofinal.png"
          class="mr-3"
          alt="Logo"
        />
        <b-navbar-brand to="/" class="d-flex align-items-center">
          <h1 id="bigBrandTitle" class="mb-0">Kung Fu Fashion Wear</h1>
          <h1 id="littleBrandTitle" class="mb-0">KFFW</h1>
        </b-navbar-brand>
      </div>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="d-flex justify-content-center">
          <b-nav-item to="/">Tienda</b-nav-item>
          <b-nav-item to="quienessomos">Quienes somos</b-nav-item>
          <b-nav-item to="formulariodecontacto"
            >Contacto</b-nav-item
          >
          <b-nav-item to="terminosycondiciones"
            >Términos y condiciones</b-nav-item
          >
          <h5 id="badgeAdministracion" v-if="logedInUser" class="mb-0">
            <b-badge to="adminproductos" variant="light">Administrar</b-badge>
          </h5>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto" id="adminInfo">
          <b-nav-text v-if="logedInUser" class="mr-2">{{
            logedInUser
          }}</b-nav-text>
          <b-icon
            v-if="!logedInUser"
            class="logIcon"
            icon="box-arrow-in-right"
            variant="light"
            font-scale="2"
            @click="goToLogin"
          ></b-icon>
          <b-icon
            v-if="logedInUser"
            class="logIcon ml-1"
            icon="box-arrow-right"
            variant="light"
            font-scale="2"
            @click="logOut"
          ></b-icon>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import firebase from "firebase";

export default {
  name: "Navbar",
  methods: {
    ...mapActions(["log_Out"]),
    goToLogin() {
      this.$router.push("login");
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then((accept) => {
          this.log_Out();
          this.$router.push("/home");
        });
    },
  },
  computed: {
    ...mapState(["logedInUser"]),
  },
};
</script>

<style scoped>
#navbar_image {
  height: 40px;
  width: 40px;
}

b-nav-item :hover {
  color: red;
}

h1 {
  font-size: 23px;
}

.logIcon :hover {
  cursor: pointer;
}

@media screen and (max-width: 599px) {
  #bigBrandTitle {
    display: none;
  }
  b-navbar-nav {
    justify-content: flex-start;
    align-items: flex-start;
  }
}
@media screen and (min-width: 600px) {
  #littleBrandTitle {
    display: none;
  }
}

@media screen and (min-width: 995px) {
  #badgeAdministracion {
    margin-right: 10px;
    margin-left: 10px;
    align-self: center;
  }
  #adminInfo {
    display: flex;
    align-items: center;
  }
}

@media screen and (max-width: 994px) {
  #adminInfo {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  #badgeAdministracion {
    margin-top: 5px;
  }
}
</style>