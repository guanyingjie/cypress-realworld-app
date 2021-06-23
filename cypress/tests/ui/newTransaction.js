const { body } = require("express-validator");
const { Context } = require("express-validator/src/context");
const { requestBody } = require("../../fixtures/requestBody.json");

const { result } = require("lodash");
import "../../support/commands.js";

describe("new transaction", function () {
  const TransactionNumber = Math.random() * 100;
  const input = Math.floor(TransactionNumber);
  context("new request transaction", function () {
    beforeEach(() => {
      cy.login("Katharina_Bernier", "s3cret");
    });
    // new request transaction
    it("new request transaction", function () {
      // cy.login("Katharina_Bernier", "s3cret");

      cy.get("[data-test=nav-top-new-transaction]").click();
      cy.get("[data-test=user-list-item-bDjUb4ir5O]").click();
      cy.get("#amount").type(input);
      cy.get("#transaction-create-description-input").type(
        "cypress daily test,the number is" + " " + input
      );
      cy.get("button[data-test=transaction-create-submit-request]").click();
      cy.get("[data-test=new-transaction-create-another-transaction]").click();
    });

    it("assert transaction is success transaction", function () {
      //test transactions api,assert the response i
      cy.request({
        method: "GET",
        url: "http://localhost:3001/transactions",
      }).then((response) => {
        expect(response).property("status").to.equal(200);
        expect(response.body.results[0].amount).to.equal(input * 100);
      });
    });
    it("use fixture to send api", function () {
      // cy.login("Katharina_Bernier", "s3cret");
      cy.fixture("requestBody").then((requestBody) => {
        //判断是否为数组
        expect(requestBody).to.be.an("array").to.have.have.length(3);
        requestBody.forEach((body) => {
          console.log(body);

          cy.request("POST", "http://localhost:3001/transactions", body).then((response) => {
            expect(response.status).to.be.eq(200);
          });
        });
      });
    });
  });
});
