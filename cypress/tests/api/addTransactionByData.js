const { cy } = require("date-fns/locale");

describe("new transaction", function () {
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
    //use fixture to send api
    it("use fixture to send api", function () {
      cy.fixture("account").as(accountJson);
      cy.request("POST", "http://localhost:3001/graphql", {});
    });
  });
});
