/// <reference types="cypress"/>
describe("wave-trial login", () => {
  beforeEach(() => {
    cy.intercept("POST", "**/user/doLogin/").as("login");
    cy.visit(Cypress.env('login_url'));
  });

  it("verifies login and logout functionality", () => {
    cy.get("#inputEmail")
      .type(Cypress.env('valid_email'))
      .then(() => {
        cy.get("#inputPassword")
          .type(Cypress.env('password'))
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
                      Cypress.env('dashboard_url')
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
                              Cypress.env('login_url')
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
    cy.get("#inputEmail")
      .type(Cypress.env('invalid_email'))
      .then(() => {
        cy.get("#inputPassword")
          .type(Cypress.env('password'))
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
