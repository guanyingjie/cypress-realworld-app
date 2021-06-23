const { cy } = require("date-fns/locale");
const { Context } = require("express-validator/src/context");
const { requestBody } = require("../../fixtures/requestBody.json");
const { login } = require("../../support/commands.js");
import "../../support/commands.js";

describe("new transaction", function () {
  context("new request transaction", function () {
    //登录
    it("login success", function () {
      cy.login("Katharina_Bernier", "s3cret");
      cy.get("[data-test=sidenav-signout]").click();
      cy.get("input[name=username]").type("Katharina_Bernier");
      cy.get("input[name=password]").type("s3cret");
      cy.get("input[name=remember]").click();
      cy.get("button[type=submit]").click();
    });

    //use fixture to send api
    it("use fixture to send api", function () {
      cy.fixture("requestBody").then((requestBody) => {
        //判断是否为数组
        expect(requestBody).to.be.an("array").to.have.have.length(3);
        requestBody.forEach((body) => {
          cy.request({
            Method: "POST",
            URL: "http://localhost:3001/graphql",
            body: body,
          }).then((response) => {
            expect(response.status).to.be.eq(200);
          });
        });
      });
    });
  });
});
