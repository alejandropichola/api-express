module.exports = {
  root: true,
  extends: ['plugin:security/recommended', 'standard', 'prettier/standard'],
  plugins: ['security'],
  env: {
    es6: true,
    node: true
  },
  rules: {
    // security
    'security/detect-object-injection': 'off',
    'security/detect-non-literal-fs-filename': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off'
  }
}
