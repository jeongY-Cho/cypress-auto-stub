module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: [
    "airbnb-base",
    "plugin:cypress/recommended",
    "plugin:import/typescript",
    "prettier",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["@typescript-eslint"],
  rules: {
    "import/extensions": "off",
    "import/no-extraneous-dependencies": "off",
    "import/prefer-default-export": "off",
    "no-restricted-syntax": "off",
  },
}
