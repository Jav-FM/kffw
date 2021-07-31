// https://docs.cypress.io/api/introduction/api.html

describe('Using cart sistem', () => {


  it('Add to cart', () => {
    cy.visit('/')
    const firstProduct = cy.get(':nth-child(1) > .card > .card-body > .justify-content-around > .btn');
    firstProduct.click();
    const tallaSelector = cy.get('#__BVID__64')
    tallaSelector.select('s');
    const addToCartBtn = cy.get('.mx-3.d-flex > .btn');
    addToCartBtn.click();
    const goToCartBtn = cy.get('.bg-dark > .btn')
    goToCartBtn.click();
    cy.get('.list-group-item')
  })

  //incrementar cantidad carrito
  //quitar producto de carrito
  //iniciar sesion con usuario
  //test de crud (si se demora mucho la respuesta de firebase hay que decirle a cypress que espere 5 o 10 minutos antes de dar la respuesta) Otra opción es trabajar con mock, esa sería la opción profesional
  //usar wait con segundos para ir presentando el proyecto, practicar para que dure 20 min maximo, si no alcanzo simplemente corro el test y luego voy poniendo el mouse sobre cada paso

})
