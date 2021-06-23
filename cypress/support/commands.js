// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// import "@testing-library/cypress/add-commands";
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... }
Cypress.Commands.add("login", (name, password) => {
  cy.visit("/signin");
  //enter correct username & password
  cy.get("input[name=username]").type(name);
  cy.get("input[name=password]").type(password);
  cy.get("input[name=remember]").click();
  cy.get("button[type=submit]").click();
  //assert  login or not
  cy.url().should("equal", "http://localhost:3000/");
  cy.getCookies("auth_keys").should("exist");
});
