module.exports = {
    root: true,
    plugins: ['babel', 'jest'],
    env: {
        node: true,
        jest: true
    },
    parser: 'babel-eslint',
    extends: ['airbnb-base', 'plugin:jest/recommended'],
    rules: {
        'no-console': 0,
        'class-methods-use-this': 0
    }
} 