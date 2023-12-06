// jest.config.js
module.exports = {
  preset: 'ts-jest/presets/default',
  moduleFileExtensions: ['vue', 'js', 'ts'],
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  testMatch: ['**/__tests__/**/*.spec.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  setupFilesAfterEnv: ['./jest.setup.ts']
};
