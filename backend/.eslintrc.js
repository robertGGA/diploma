module.exports = {
    extends: ['plugin:prettier/recommended'],
    root: true,
    env: {
        node: true,
        jest: true,
    },
    ignorePatterns: ['.eslintrc.js'],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        sourceType: 'module',
        ecmaVersion: 13,
        parser: '@typescript-eslint/parser',
    },
    plugins: ['@typescript-eslint'],
};
