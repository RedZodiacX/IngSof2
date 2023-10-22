export default {
  moduleFileExtensions: [
    'mjs',
    'js',
  ],
  testMatch: ['**/?(*.)+(spec|test).(m)js'],
  verbose: true,
  testPathIgnorePatterns: ['integration'],
  collectCoverage: true,
  coverageThreshold: {
    global: {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
};
