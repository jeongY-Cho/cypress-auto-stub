export function normalizeName(alias: string): string {
  return alias.replace(/[^a-zA-Z0-9/\-_@]/g, "")
}

export function generatePath(
  basePath: string,
  titlePath: string[],
  alias: string
): string {
  const joinedTitlePath = titlePath
    .map((path) => path.toLowerCase().trim().replaceAll(" ", "-"))
    .join("/")

  const joinedPath = `${basePath}/${joinedTitlePath}/`
  const fileName = `@${normalizeName(alias)}.json`

  const fullPath = `${joinedPath}${fileName}`
  const slashCorrectedPath = fullPath.replace("//", "/")
  return slashCorrectedPath
}

const optionNameMap: {
  [T in keyof Omit<Cypress.SetCookieOptions, "log" | "timeout">]: RegExp
} = {
  domain: /domain/i,
  expiry: /expiry/i,
  path: /path/i,
  secure: /secure/i,
  sameSite: /samesite/i,
  httpOnly: /httponly/i,
} as const

export function parseCookie(
  cookieStr: string
): [string, string, Partial<Cypress.SetCookieOptions>] {
  const [nameValue, ...rest] = cookieStr
    .split(";")
    .map((s) => s.trim().replace(";", ""))
  const [name, value] = nameValue.split("=")

  const options: Partial<Cypress.SetCookieOptions> = {
    log: false,
  }

  rest.forEach((optionStr) => {
    const [optionName, optionValue] = optionStr.split("=")

    Object.entries(optionNameMap).forEach(([op, regex]) => {
      if (optionName.match(regex)) {
        // @ts-expect-error
        options[op] = optionValue
      }
    })
  })

  return [name, value, options]
}
