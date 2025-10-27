module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.integration.test.ts'],
  collectCoverageFrom: [
    'controllers/**/*.ts',
    'services/**/*.ts',
    'middlewares/**/*.ts'
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70
    }
  }
};