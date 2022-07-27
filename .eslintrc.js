module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["plugin:react/recommended", "standard", "prettier"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": "warn",
    "import/no-absolute-path": "off",
    "react/no-unescaped-entities": "off",
  },
  settings: {
    react: {
      version: "18.0",
    },
  },
}
