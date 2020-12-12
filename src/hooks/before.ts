/**
 * this `before` hook is a logging message
 */
before(() => {
  if (Cypress.env("ignoreAutoStubs")) {
    cy.log(
      "Auto Stub: `ignoreAutoStub` flag is `true`; Will behave as a normal intercept"
    )
  } else if (Cypress.env("refreshAutoStubs")) {
    cy.log("Auto Stub: `refreshAutoStubs` is true; Will refresh all stubs")
  } else {
    cy.log("cypress-auto-sub is active")
  }
})
