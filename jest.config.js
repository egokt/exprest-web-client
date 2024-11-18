/** @type {import('ts-jest').JestConfigWithTsJest} **/
export default {
  testEnvironment: "jsdom",
  transform: {
    "\\.[jt]sx?$": ["ts-jest", { "useESM": true, }],
  },
  moduleNameMapper: {
    "(.+)\\.js": "$1"
  },
  extensionsToTreatAsEsm: [".ts",],
  modulePathIgnorePatterns: ["<rootDir>/dist/"],
  setupFilesAfterEnv: ['./jest.setup.ts'],
};
