const { body } = require("express-validator");
const { Context } = require("express-validator/src/context");
const { result } = require("lodash");
import "../../support/commands.js";

describe("new transaction", function () {
  const TransactionNumber = Math.random() * 100;
  const input = Math.floor(TransactionNumber);
  context("new request transaction", function () {
    //登录
    // it("login success", function () {

    // });
    // //enter correct username & password
    // it("enter username & password", function () {
    //   cy.get("input[name=username]").type("Katharina_Bernier");
    //   cy.get("input[name=password]").type("s3cret");
    //   cy.get("input[name=remember]").click();
    //   cy.get("button[type=submit]").click();
    //   //assert  login or not
    //   cy.url().should("equal", "http://localhost:3000/");
    // });

    // new request transaction
    it("new request transaction", function () {
      cy.login("Katharina_Bernier", "s3cret");
      cy.get("[data-test=sidenav-signout]").click();
      cy.get("input[name=username]").type("Katharina_Bernier");
      cy.get("input[name=password]").type("s3cret");
      cy.get("input[name=remember]").click();
      cy.get("button[type=submit]").click();
      cy.get("[data-test=nav-top-new-transaction]").click();
      cy.get("[data-test=user-list-item-bDjUb4ir5O]").click();
      cy.get("#amount").type(input);
      cy.get("#transaction-create-description-input").type(
        "cypress daily test,the number is" + " " + input
      );
      cy.get("button[data-test=transaction-create-submit-request]").click();
      cy.get("[data-test=new-transaction-create-another-transaction]").click();
    });
    //test login api
    it("assert transaction is success transaction", function () {
      cy.request("POST", "http://localhost:3001/login", {
        username: "Katharina_Bernier",
        password: "s3cret",
        type: "LOGIN",
      });
      //test transactions api,assert the response i
      cy.request({
        method: "GET",
        url: "http://localhost:3001/transactions",
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        expect(response.body.results[0].amount).to.equal(input * 100);
      });
      // cy.get("[data-test=sidenav-home]").click();

      // cy.get("[data-test=nav-personal-tab]").click();
    });
  });
});
