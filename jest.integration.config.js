module.exports = {
  preset: 'jest-playwright-preset',
  testMatch: ['**/__integration__/**/*.(spec|test).+(ts|js)'],
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  }
}
