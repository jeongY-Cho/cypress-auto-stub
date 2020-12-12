/// <reference types="cypress" />

import { RouteMatcher } from "cypress/types/net-stubbing"

/* eslint-disable no-unused-vars */
export interface AutoStubOptions {
  folderPath?: string
  ignore?: boolean
  refresh?: boolean
}

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * `cypress-auto-stub` Automatically intercepts and stubs requests
       * that match the given matcher.
       *
       */
      autoStub(
        alias: string,
        matcher: RouteMatcher,
        options?: AutoStubOptions
      ): Cypress.Chainable<null>
    }
  }
}
