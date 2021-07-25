<template>
  <div class="d-flex flex-column align-items-center">
    <h2 class="mt-4 mb-5">Carro de compras</h2>
    <!--Lista de Productos en Carrito-->
    <div>

        <b-list-group>
          <b-list-group-item class="d-flex align-items-center">
            <div>
              <img style="width: 80px;" src="../assets/Mockups_Poleras_01.jpg" alt="foto producto">
            </div>
            <div class="mx-3 d-flex flex-column justify-content-center">
              <p class="m-0">Nombre producto</p>
              <p class="m-0">$ 10000</p>
            </div>
            <div class="mx-3 d-flex align-items-center">
              <b-button size="sm" style="width:25px;" class="botonNegro">-</b-button>
              <p class="my-0 mx-2">1</p>
              <b-button size="sm" style="width:25px;" class="botonNegro">+</b-button>
            </div>
              <div class="mx-3 d-flex flex-column justify-content-center">
              <p class="m-0">Total:</p>
              <p class="m-0">$ 10000</p>
            </div>
          </b-list-group-item>

                    <b-list-group-item class="d-flex align-items-center">
            <div>
              <img style="width: 80px;" src="../assets/Mockups_Poleras_01.jpg" alt="foto producto">
            </div>
            <div class="mx-3 d-flex flex-column justify-content-center">
              <p class="m-0">Nombre producto</p>
              <p class="m-0">$ 10000</p>
            </div>
            <div class="mx-3 d-flex align-items-center">
              <b-button size="sm" style="width:25px;" class="botonNegro">-</b-button>
              <p class="my-0 mx-2">1</p>
              <b-button size="sm" style="width:25px;" class="botonNegro">+</b-button>
            </div>
              <div class="mx-3 d-flex flex-column justify-content-center">
              <p class="m-0">Total:</p>
              <p class="m-0">$ 10000</p>
            </div>
          </b-list-group-item>
        </b-list-group>

        <div class="m-3 d-flex flex-column align-items-end">
          <h3>total: $ 20000</h3>
          <b-button class="botonRojo mt-2" style="width:150px;">Finalizar compra</b-button>
        </div>
    </div>
  </div>
</template>