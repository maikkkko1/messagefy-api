// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
  bail: 0,
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: ["src/**"],
  coverageDirectory: "__tests__/coverage",
  testEnvironment: "node",
  roots: ["<rootDir>/__tests__"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  testRegex: "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
  modulePathIgnorePatterns: ["<rootDir>/__tests__/factory", "<rootDir>/__tests__/testDb"],
};
