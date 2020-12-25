module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-typescript'
  ],

  parserOptions: {
    project: ['./tsconfig.json'],
  }
};
