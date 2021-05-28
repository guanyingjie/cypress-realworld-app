const { contextsKey } = require("express-validator/src/base");
const { exists } = require("fs");

describe("login with html form", function () {
  context("success login case", function () {
    it("login success", function () {
      cy.visit("/signin");
    });
    //enter correct username & password
    it("enter username & password", function () {
      cy.get("input[name=username]").type("Katharina_Bernier");
      cy.get("input[name=password]").type("s3cret");
      cy.get("input[name=remember]").click();
      cy.get("button[type=submit]").click();
      //assert  login or not
      cy.url().should("equal", "http://localhost:3000/");
      cy.getCookies();
    });
  });
  context("failed login case", function () {
    it("login failed", function () {
      cy.visit("/signin");
    });
    //enter incorrect username& password
    it("enter username & password", function () {
      cy.get("input[name=username]").type("Katharina_Berni");
      cy.get("input[name=password]").type("s3cret");
      cy.get("input[name=remember]").click();
      cy.get("button[type=submit]").click();
      //assert  login or not
      cy.get(".MuiAlert-message").should("be.visible");
    });
  });
});
