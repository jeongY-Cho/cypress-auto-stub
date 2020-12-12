/**
 * When `true`, cypress-auto-stub ignores stubs and just returns a normal interceptor
 * with alias
 */
export const ignoreAutoStubs = Cypress.env("ignoreAutoStubs")

/**
 * When `true`, cypress-auto-stub refreshes all stubs
 */
export const refreshAutoStubs = Cypress.env("refreshAutoStubs")

/**
 * Sets base path for fixtures. Defaults to `cypress/fixtures/autoStub`
 */
export const autoStubFolderPath =
  Cypress.env("autoStubPath") || "cypress/fixtures/autoStub"
