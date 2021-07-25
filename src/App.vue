<template>
  <div id="app">
    <Navbar />
    <router-view />
    <img v-if="!logedInUser" id="whatsappLogo" src="@/assets/logowhatsapp.png" alt="Whatsapp Logo">
    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mapState } from 'vuex'

export default {
  name: "App",
  components: {
    Navbar, Footer,
  },
  computed: {
    ...mapState(["logedInUser"])
  }
};
</script>


<style lang="scss">
html {
  box-sizing: none;
  min-height: 100%;
  position: relative;
}

h1,
h2,
h3,
h4 {
  font-family: "Roboto", sans-serif;
  margin-bottom: 0px;
}
h1 {
  font-weight: 700;
  font-size: 30px;
}
h2 {
  font-weight: 700;
  font-size: 30px;
}
h3 {
  font-weight: 400;
  font-size: 25px;
}
h4 {
  font-weight: 400;
  font-size: 20px;
}
p {
  font-family: "Open Sans", sans-serif;
  font-weight: 400;
}
.botonRojo {
  background-color: #ee1d23;
  border: #ee1d23;
  &:hover {
    background-color: #eb6e72;
  }
}
.botonBlanco {
  color: #ee1d23;
  border: #ee1d23;
  background-color: white;
  &:hover {
    background-color: #2c2c2c;
  }
}
.botonNegro {
  border: black;
  background-color: black;
  &:hover {
    background-color: #646464;
  }
}
#whatsappLogo {
  height: 80px;
  position: fixed;
  z-index: 2;
  bottom: 30px;
  right: 30px;
}
@media screen and (max-width: 350px) {
#whatsappLogo {
  bottom: 20px;
  right: 20px;
}
}
</style>
