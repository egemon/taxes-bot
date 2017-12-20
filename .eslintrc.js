module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      impliedStrict: true
    }
  },
  extends: [
  ],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    require: true,
  },
  rules: {
    // 'no-console': [2, { allow: ["warn"] }],
    'no-unused-vars': [2, { "args": "none" }],
    "comma-dangle": [2, "always-multiline"],
    'no-mixed-operators': 1,
    'func-names': 1,
    'no-restricted-syntax': 1,
    "no-restricted-globals": [2, "check"],
    'no-underscore-dangle': 0,
    'no-prototype-builtins': 1,
    'guard-for-in': 1,
    'no-loop-func': 1,
    'no-plusplus': 1,
    'no-continue': 1,
    'array-callback-return': 1,
    'consistent-return': 1,
    'no-new': 1,
    radix: 1,
    'no-restricted-properties': 1,
    'prefer-arrow-callback': 0,
    'object-curly-spacing': ["error", "never"],
  },
  settings: {
  },
};
