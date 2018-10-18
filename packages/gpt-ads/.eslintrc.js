module.exports = {
  root: true,
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    jest: true
  },
  extends: 'airbnb-base',
  plugins: [
    'jest',
    'vue'
  ],
  globals: {
    'jest/globals': true,
    jasmine: true
  }
}
