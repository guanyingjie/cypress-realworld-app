const { body } = require("express-validator");
const { Context } = require("express-validator/src/context");
const { requestBody } = require("../../fixtures/requestBody.json");

const { result } = require("lodash");
import "../../support/commands.js";

describe("new transaction", function () {
  context("new request transaction", function () {
    beforeEach(() => {
      cy.login("Katharina_Bernier", "s3cret");
    });
    // new request transaction

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
