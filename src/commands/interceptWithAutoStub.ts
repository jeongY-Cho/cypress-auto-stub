import { RouteMatcher } from "cypress/types/net-stubbing"
import { parseCookie } from "../utils"

/**
 *
 * @param fixturePath path to save captured response
 * @param matcher url matcher
 * @param alias alias for interceptor and filename for saved stub
 */
export function interceptWithAutoStub(
  fixturePath: string,
  matcher: RouteMatcher,
  alias: string
) {
  // get the stub
  return cy.readFile(fixturePath, { log: false }).then((res) => {
    // set cookies from stub
    if (res.headers["set-cookie"]) {
      res.headers["set-cookie"].forEach((cookieStr: string) => {
        cy.setCookie(...parseCookie(cookieStr))
      })

      res.headers["x-set-cookie"] = res.headers["set-cookie"].join(",")
      delete res.headers["set-cookie"]
    }
    /**
     * Some bug or implementation aspect of cypress errors when `set-cookie` (and any other header) is not a string.
     * So loop through `set-cookie` strings and set them manually, then concat the array and stick it
     * in a new header, `x-set-cookie` that can be used for debugging.
     */

    // set custom headers that can be used for debugging
    res.headers["x-request-stubbed-with"] = "cypress-auto-stub"
    res.headers["x-auto-stub-path"] = fixturePath

    // now set intercept with alias
    return cy
      .intercept(matcher, (req) => {
        req.reply(res)
      })
      .as(alias)
  })
}
