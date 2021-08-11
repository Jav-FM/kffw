// https://docs.cypress.io/api/introduction/api.html

describe("Using cart sistem", () => {
  it("Add to cart", () => {
    cy.visit("/");
    cy.wait(5000)
    const firstProduct = cy
      .get(
        ":nth-child(1) > #productCard > .card-body > .justify-content-center > .btn"
      )
      .pause();
    firstProduct.click();
    const tallaSelector = cy.get(".tallasSelector").pause();
    tallaSelector.select("s");
    const addToCartBtn = cy.get(".mx-3.d-flex > .btn").pause();
    addToCartBtn.click();
    const goToCartBtn = cy.get(".bg-dark > .btn").pause();
    goToCartBtn.click();
    cy.get(".list-group-item");
  });

  it("Increase/decrease units in cart", () => {
    const increaseBtn = cy
      .get(".list-group-item > .align-items-center > :nth-child(3)")
      .pause();
    increaseBtn.click();
    const decreaseBtn = cy
      .get(".list-group-item > .align-items-center > :nth-child(1)")
      .pause();
    decreaseBtn.click();
  });

  it("Delete from cart", () => {
    const deleteIcon = cy.get("#deleteIcon").pause();
    deleteIcon.click();
    const eliminarBtn = cy
      .get("#deleteButton")
      .pause();
    eliminarBtn.click();
  });
});

describe("Using administration sistem", () => {
  it("Log In Process", () => {
    cy.visit("/");
    const logInIcon = cy.get(".bi-box-arrow-in-right").pause();
    logInIcon.click();
    const emailInput = cy.get("#input-1");
    emailInput.type("javiera.fortunato@gmail.com");
    const passInput = cy.get("#text-password");
    passInput.type("123456");
    const ingresarBtn = cy.get(".botonNegro").pause();
    ingresarBtn.click();
  });

  it("Create a new Product", () => {
    const agregarBtn = cy.get("#agregarBtn").pause();
    agregarBtn.click();
    const nameInput = cy.get("#input-1");
    nameInput.type("Polera Nueva");
    const sSizeInput = cy.get("#sInput");
    sSizeInput.type("{backspace}3");
    const mSizeInput = cy.get("#mInput");
    mSizeInput.type("{backspace}8");
    const detalleTextArea = cy.get("#input-2");
    detalleTextArea.type("Polera con estampado.");
    const tematicaSelector = cy.get("#tematicaSelector");
    tematicaSelector.select("formas");
    const precioInput = cy.get("#input-3");
    precioInput.type("{backspace}12000");
    const ofertaSelector = cy.get("#ofertaSelector");
    ofertaSelector.select("Sí");
    const ofertaMontoInput = cy.get("#input-5");
    ofertaMontoInput.type("{backspace}2000");
    const finalizarAgregarBtn = cy.get("#finalizarAgregarBtn").pause();
    finalizarAgregarBtn.click().pause();
  });

  it("Search a Product", () => {
    const busquedaInput = cy.get("#busquedaInput").pause();
    busquedaInput.type("nueva");
  });

  it("Edit a Product", () => {
    const editBtn = cy.get(".bi-pencil-fill > g > path").pause();
    editBtn.click();
    const nombreInput = cy.get("#input-1");
    nombreInput.type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}Editada"
    );
    const guardarCambiosBtn = cy.get("#guardarCambiosBtn").pause();
    guardarCambiosBtn.click();
  });

  it("Delete a Product", () => {
    const busquedaInput = cy.get("#busquedaInput");
    busquedaInput.type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}editada"
    );
    const deleteBtn = cy
      .get('[aria-colindex="9"] > .d-flex > :nth-child(2)')
      .pause();
    deleteBtn.click();
    const confirmDeleteBtn = cy.get("#confirmDeleteBtn").pause();
    confirmDeleteBtn.click();
    cy.get("#busquedaInput").type(
      "{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}{backspace}"
    );
  });
});
