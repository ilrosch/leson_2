module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ["eslint:recommended", "plugin:react/recommended"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 14,
    sourceType: "module",
  },
  plugins: ["react"],
  rules: {},
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['@ui', './src/ui'],
          ['@features/', './src/features']
        ],
        extensions: ['.ts', '.js', '.jsx', '.tsx']
      }
    }
};
