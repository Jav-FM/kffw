<template>
  <div id="app">
    <Telon v-if="telonActivo"/>
    <Navbar />
    <router-view />

    <Footer />
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { mapState, mapActions } from "vuex";
import Telon from "@/components/Telon";

export default {
  name: "App",
  components: {
    Navbar,
    Footer,
    Telon,
  },
  computed: {
    ...mapState(["logedInUser", "telonActivo"]),
  },
  methods: {
    ...mapActions(["actualizarEstado"]),
  },
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
  color: black;
  border: black;
  background-color: white;
  &:hover {
    background-color: #929191;
  }
}
.botonNegro {
  border: black;
  background-color: black;
  &:hover {
    background-color: #646464;
  }
}
</style>
