<template>
    <div class="mt-2 d-flex align-items-center flex-wrap">

        <h5 class="mb-0"><b-badge v-if="filtros.tematicaSeleccionada" variant="danger" class="mx-1">Temática: {{ filtros.tematicaSeleccionada }} <b-icon icon="x-circle-fill" font-scale="1" class="puntero ml-2" @click="eliminarFiltro('tematica')"></b-icon></b-badge></h5>

        <h5 class="mb-0"><b-badge v-if="filtros.tallaSeleccionada" variant="danger" class="mx-1">Talla: {{ filtros.tallaSeleccionada }} <b-icon icon="x-circle-fill" font-scale="1" class="puntero ml-2" @click="eliminarFiltro('talla')"></b-icon></b-badge></h5>

        <h5 class="mb-0"><b-badge v-if="filtros.filtroPorNombre" variant="danger" class="mx-1">Nombre: {{ filtros.filtroPorNombre }} <b-icon icon="x-circle-fill" font-scale="1" class="puntero ml-2" @click="eliminarFiltro('nombre')"></b-icon></b-badge></h5>

        <h5 class="mb-0"><b-badge v-if="filtros.filtroOfertaActivo" variant="danger" class="mx-1">En oferta <b-icon icon="x-circle-fill" font-scale="1" class="puntero ml-2" @click="eliminarFiltro('oferta')"></b-icon></b-badge></h5>

        <h5 class="mb-0"><b-badge variant="dark" class="puntero mx-1" @click="eliminarFiltros">Eliminar filtros</b-badge></h5>
      
    </div>

</template>

<script>
export default {
  name: "FiltrosAplicados",
  props: {
    filtros: {
      type: Object,
    },
  },
  methods: {
    eliminarFiltros() {
      this.$emit("eliminarFiltros");
    },
    eliminarFiltro(filtro) {
      this.$emit("eliminarFiltro", filtro)
    },
  },
};
</script>

<style lang="scss" scoped>

.puntero {
  &:hover {
  cursor: pointer;
}

}
</style>