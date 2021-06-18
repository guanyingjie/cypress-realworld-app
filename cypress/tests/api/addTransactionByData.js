describe("new transaction", function () {
  const TransactionNumber = Math.random() * 100;
  const input = Math.floor(TransactionNumber);
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
  });
});
