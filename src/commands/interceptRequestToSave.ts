import { RouteMatcher } from "cypress/types/net-stubbing"
import Cache from "../requestCache"

/**
 *
 * @param fixturePath path to save captured response
 * @param matcher url matcher
 * @param alias stub fixture file name
 */
export function interceptRequestForSave(
  fixturePath: string,
  matcher: RouteMatcher,
  alias: string
) {
  return cy
    .intercept(matcher, (req) => {
      req.reply((res) => {
        Cache.add(fixturePath, res)
        return res
      })
    })
    .as(alias)
}
