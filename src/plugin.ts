import fs from "fs"

export default function assignPlugin(on: Cypress.PluginEvents) {
  on("task", {
    /**
     *
     * @param filePath file path to check for existence of an auto stubbed fixture
     */
    doesFixtureExist(filePath) {
      return fs.existsSync(filePath)
    },
  })
}
