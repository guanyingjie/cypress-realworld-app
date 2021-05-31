const { body } = require("express-validator");
const { Context } = require("express-validator/src/context");
const { result } = require("lodash");

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
    // new request transaction
    it("new request transaction", function () {
      cy.get("[data-test=sidenav-signout]").click();
      cy.get("input[name=username]").type("Katharina_Bernier");
      cy.get("input[name=password]").type("s3cret");
      cy.get("input[name=remember]").click();
      cy.get("button[type=submit]").click();
      cy.get("[data-test=nav-top-new-transaction]").click();
      cy.get("[data-test=user-list-item-bDjUb4ir5O]").click();
      cy.get("#amount").type(TransactionNumber);
      cy.get("#transaction-create-description-input").type(
        "cypress daily test,the number is" + " " + TransactionNumber
      );
      cy.get("button[data-test=transaction-create-submit-request]").click();
      cy.get("[data-test=new-transaction-create-another-transaction]").click();
    });
    //assert transaction is success
    it("assert transaction is success transaction", function () {
      cy.request("POST", "http://localhost:3001/login", {
        username: "Katharina_Bernier",
        password: "s3cret",
        type: "LOGIN",
      });

      cy.request({
        method: "GET",
        url: "http://localhost:3001/transactions",
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        expect(response)
          .property(body)
          .property(results)[0]
          .property(amount)
          .to.equal(TransactionNumber);
      });
      // cy.get("[data-test=sidenav-home]").click();

      // cy.get("[data-test=nav-personal-tab]").click();
    });
  });
});
