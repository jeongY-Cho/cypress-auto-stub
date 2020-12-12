import Cache from "../requestCache"

afterEach(() => {
  /**
   * Call saveCache after each test
   * If a cached response exists, Cache will write it to disk
   */
  Cache.saveCache()
})
