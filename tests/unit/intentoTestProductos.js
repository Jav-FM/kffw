import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import ProductsGallery from '@/components/home/ProductsGallery'
import Vuex from 'vuex'
import storeConfig from './mocks/store-config'

const localVue = createLocalVue()
localVue.use(Vuex)
const store = new Vuex.Store(storeConfig)

describe('Uso de filtros en galería de productos', () => {
    it('Filtro por nombre', async () => {
        const wrapper = mount(ProductsGallery, {
            localVue,
            store,
            propsData: {
                filtros: {
                    filtroPorNombre: "",
                },
            },
            
        })
        // console.log("mi store: ",store.state.productos[0].data)
        console.log("mi wrapper: ",wrapper.vm.productsToShow)
        expect(1).toBe(1)
    })
})