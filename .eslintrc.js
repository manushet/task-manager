module.exports = {
    root: true,
    env: {
        node: true
    },
    extends: [
        'plugin:vue/vue3-essential',
        '@vue/standard'
    ],
    parserOptions: {
        parser: '@babel/eslint-parser'
    },
    rules: {
        'no-trailing-spaces': 0,
        indent: 0, 
        semi: 0,
        'eol-last': 0,
        'object-curly-spacing': 0,
        'space-before-function-paren': 0,
        'no-unused-vars': 1,
        'comma-dangle': 0,
        'spaced-comment': 0,
        'no-multiple-empty-lines': 0,
        camelcase: 0
    }
}
