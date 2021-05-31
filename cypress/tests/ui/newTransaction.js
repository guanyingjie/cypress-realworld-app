const { Context } = require("express-validator/src/context");

describe("new transaction", function () {
  const TransactionNumber = Math.random() * 100;
  context("new request transaction", function () {
    //登录
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
    });

    it("new request transaction", function () {
      cy.get("[data-test=nav-top-new-transaction]").click();
      cy.get("[data-test=user-list-item-bDjUb4ir5O]").click();
      cy.get("input[id=Amount]").type(TransactionNumber);
      cy.get("input[id=transaction-create-description-input]").type("cypress daily test");
      cy.get("button[data-test=transaction-create-submit-request]").click();
    });
  });
});
