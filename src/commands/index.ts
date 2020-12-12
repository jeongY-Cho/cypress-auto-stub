import { RouteMatcher } from "cypress/types/net-stubbing"
import { interceptWithAutoStub } from "./interceptWithAutoStub"

import { generatePath } from "../utils"
import { interceptRequestForSave } from "./interceptRequestToSave"

/**
 * loaded configs
 */
import * as config from "../config"

/**
 * Import hooks to register them
 */
import "../hooks"

/**
 * add the custom command to cypress
 */
Cypress.Commands.add(
  "autoStub",
  /**
   *
   * @param alias alias to name auto stub
   * @param matcher url matcher
   */
  function autoStub(alias: string, matcher: RouteMatcher) {
    const fixturePath = generatePath(
      config.autoStubFolderPath,
      // @ts-expect-error || no def for `this`
      this.test.titlePath(),
      alias
    )

    if (config.ignoreAutoStubs) {
      return cy.intercept(matcher).as(alias)
    }

    return cy
      .task("doesFixtureExist", fixturePath, { log: false })
      .then((exists) => {
        if (config.refreshAutoStubs) {
          cy.log(`Auto Stub: refreshing stub for @${alias}`)
          return interceptRequestForSave(fixturePath, matcher, alias)
        }

        if (exists) {
          cy.log(`Auto Stub: will stub @${alias}`)
          return interceptWithAutoStub(fixturePath, matcher, alias)
        }

        cy.log(`Auto Stub: will make new stub for @${alias}`)
        return interceptRequestForSave(fixturePath, matcher, alias)
      })
  }
)
