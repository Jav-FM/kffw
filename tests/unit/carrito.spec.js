import { shallowMount, createLocalVue } from '@vue/test-utils'
import Vuex from 'vuex'
import storeConfig from './mocks/store-config'
//Forma de importar componente:
//import HelloWorld from '@/components/HelloWorld.vue'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(storeConfig)

// describe("Tests de carrito", () => {

//   //Producto que se ocupará en testing:
//   const producto = {
//     id: "dkad23a",
//     data: {
//       nombre: "Producto",
//       detalle: "Mi producto",
//       imagen: {
//         nameFile: "mi_imagen.jpg",
//         url: "http://mi_imagen.jpg"
//       },
//       estado: true,
//       precio: 10000,
//       oferta: true,
//       ofertaMonto: 2000,
//       tematica: "otros",
//       tallas: [
//         {
//           stock: "1",
//           talla: "s"
//         },
//         {
//           stock: "2",
//           talla: "m"
//         },
//         {
//           stock: "5",
//           talla: "l"
//         },
//         {
//           stock: "0",
//           talla: "xl"
//         },
//       ],
//     }
//   }

//   it('Acción para agregar producto al carrito', () => {
//     expect(store.state.carrito.lenght = 0);
//     let id = producto.id
//     let talla = "m"
//     store.dispatch('add_To_Cart', {id, talla} )
//     expect(store.state.carrito.lenght = 1);
//   })

//   //Variable a utilizar en siguientes 3 tests:
//   let index = 0;

//   it('Acción para aumentar la cantidad de producto en el carrito', () => {
//     expect(store.state.carrito[0].cantidad).toBe(1);
//     store.dispatch('aumentar_Carrito', index);
//     expect(store.state.carrito[0].cantidad).toBe(2);
//   })

//   it('Acción para disminuir la cantidad de producto en el carrito', () => {
//     expect(store.state.carrito[0].cantidad).toBe(2);
//     store.dispatch('disminuir_Carrito', index);
//     expect(store.state.carrito[0].cantidad).toBe(1);
//   })

//   it('Acción para eliminar el producto del carrito', () => {
//     expect(store.state.carrito.lenght = 1);
//     store.dispatch('eliminar_Producto', index);
//     expect(store.state.carrito.lenght = 0);
//   })

// })

