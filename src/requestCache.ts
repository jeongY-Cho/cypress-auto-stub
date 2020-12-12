/**
 * Cache has methods to cache and save requests
 */
class Cache {
  /**
   * Holds responses
   */
  private apiMocksToSave: { [key: string]: Object } = {}

  /**
   * add a request to the cache
   *
   * @param fixturePath path to save the fixture
   * @param response response object
   */
  add = (fixturePath: string, response: any) => {
    this.apiMocksToSave[fixturePath] = response
  }

  /**
   * Save the contents of the cache to disk.
   */
  saveCache = () => {
    for (const [path, obj] of Object.entries(this.apiMocksToSave)) {
      const extractedAlias = /(@.+?)\.json/.exec(path)
      cy.log(`Auto Stub: saving stub for ${extractedAlias![1]}`)

      cy.writeFile(path, JSON.stringify(obj, undefined, 2), { log: false })
    }
  }

  /**
   * Clear the cache.
   */
  clear = () => {
    this.apiMocksToSave = {}
  }
}

/**
 * Cache is a singleton object that handles caching and saving request stubs
 */
export default new Cache()
