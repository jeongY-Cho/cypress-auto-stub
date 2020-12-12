import Cache from "../requestCache"

/**
 * The beforeEach here clears all requests cached from previous test.
 */
beforeEach(() => {
  Cache.clear()
})
