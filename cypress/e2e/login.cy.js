/// <reference types="cypress"/>
describe("wave-trial login", () => {
  beforeEach(() => {
    cy.visit("https://wave-trial.getbynder.com/login/");
  });

  it("verifies login and logout functionality", () => {
    cy.intercept("POST", "**/user/doLogin/").as("login");
    cy.get("#inputEmail")
      .type("gul@mailinator.com")
      .then(() => {
        cy.get("#inputPassword")
          .type("Tester@123")
          .then(() => {
            cy.get(".login-btn")
              .click()
              .then(() => {
                cy.wait("@login")
                  .its("response.statusCode")
                  .should("eq", 302)
                  .then(() => {
                    cy.url().should(
                      "be.equal",
                      "https://wave-trial.getbynder.com/account/dashboard/"
                    );
                    cy.title().should("eq", "Wave trial");
                  })
                  .then(() => {
                    cy.get(".profile")
                      .click()
                      .then(() => {
                        cy.contains("Logout")
                          .click()
                          .then(() => {
                            cy.url().should(
                              "be.equal",
                              "https://wave-trial.getbynder.com/login/"
                            );
                            cy.title().should("eq", "Wave trial");
                          });
                      });
                  });
              });
          });
      });
  });

  it("verifies invalid login flow", () => {
    const runout = [
      "Security Check",
      "You have entered an incorrect username or password.",
    ];
    const regex = new RegExp(`${runout.join("|")}`, "g");
    cy.intercept("POST", "**/user/doLogin/").as("login");
    cy.get("#inputEmail")
      .type("gul1@mailinator.com")
      .then(() => {
        cy.get("#inputPassword")
          .type("Tester@123")
          .then(() => {
            cy.get(".login-btn")
              .click()
              .then(() => {
                cy.get("#login").contains(regex);
              });
          });
      });
  });
});
