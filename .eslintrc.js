module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: '@babel/eslint-parser',
    ecmaVersion: 11,
    requireConfigFile: false
  },
  extends: [
    '@nuxtjs',
    'plugin:nuxt/recommended'
  ],
  plugins: [],
  // add your custom rules here
  rules: {
    semi: [2, 'never'],
    'vue/valid-v-slot': 'off',
    camelcase: 'off',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/multi-word-component-names': 'off'
  }
}
