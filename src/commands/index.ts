import { RouteMatcher } from "cypress/types/net-stubbing"
import { AutoStubOptions } from "../../types"

import { interceptWithAutoStub } from "./interceptWithAutoStub"
import { interceptRequestForSave } from "./interceptRequestToSave"

import { generatePath } from "../utils"

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
  function autoStub(
    alias: string,
    matcher: RouteMatcher,
    options?: AutoStubOptions
  ) {
    /**
     * Type Checking
     */
    if (typeof alias !== "string") {
      throw new TypeError("alias is of incorrect type. Should be `string`")
    }

    if (options && typeof options.folderPath !== "string") {
      throw new TypeError(
        "options.folderPath is of incorrect type. Should be `string`"
      )
    }
    /** */

    const combinedOptions: Required<AutoStubOptions> = {
      folderPath: config.autoStubFolderPath,
      ignore: config.ignoreAutoStubs,
      refresh: config.refreshAutoStubs,
      ...options,
    }

    const fixturePath = generatePath(
      combinedOptions.folderPath,
      // @ts-expect-error || no def for `this`
      this.test.titlePath(),
      alias
    )

    if (combinedOptions.ignore) {
      cy.log(`Auto Stub: Ignoring auto stub for @${alias}`)
      return cy.intercept(matcher).as(alias)
    }

    if (combinedOptions.refresh) {
      cy.log(`Auto Stub: refreshing stub for @${alias}`)
      return interceptRequestForSave(fixturePath, matcher, alias)
    }

    return cy
      .task("doesFixtureExist", fixturePath, { log: false })
      .then((exists) => {
        if (exists) {
          cy.log(`Auto Stub: will stub @${alias}`)
          return interceptWithAutoStub(fixturePath, matcher, alias)
        }

        cy.log(`Auto Stub: will make new stub for @${alias}`)
        return interceptRequestForSave(fixturePath, matcher, alias)
      })
  }
)
