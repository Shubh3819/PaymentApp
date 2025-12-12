module.exports = {
  root: true,
  env: { browser: true, es2021: true, node: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "plugin:jsx-a11y/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:prettier/recommended"
  ],
  ignorePatterns: ["dist", "build", "node_modules", ".eslintrc.cjs"],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: { jsx: true }
  },
  settings: {
    react: { version: "detect" },
    "import/resolver": { node: { extensions: [".js", ".jsx", ".ts", ".tsx"] } }
  },
  plugins: ["react-refresh", "import", "jsx-a11y", "prettier"],
  rules: {
    "prettier/prettier": "warn",
    "react-refresh/only-export-components": [
      "warn",
      { allowConstantExport: true }
    ],
    "react/prop-types": "off",
    "react/react-in-jsx-scope": "off",
    "no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    "no-console": ["warn", { allow: ["warn", "error"] }],
    "eqeqeq": ["error", "always"],
    "consistent-return": "warn",
    "prefer-const": ["warn", { destructuring: "all" }],
    "import/order": [
      "warn",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          ["parent", "sibling", "index"],
          "object",
          "type"
        ],
        "newlines-between": "always",
        alphabetize: { order: "asc", caseInsensitive: true }
      }
    ],
    "jsx-a11y/anchor-is-valid": "warn",
    "jsx-a11y/no-noninteractive-element-interactions": "off"
  },
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      parserOptions: { ecmaVersion: "latest", sourceType: "module", project: "./tsconfig.json" }
    },
    {
      files: ["**/__tests__/**", "**/*.test.{js,jsx,ts,tsx}"],
      env: { jest: true }
    }
  ]
};
