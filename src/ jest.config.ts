export const preset = "ts-jest";
export const testEnvironment = "node";
export const testMatch = ["**/dist/**/*.test.js"]; // Target .js files in dist
export const modulePathIgnorePatterns = ["<rootDir>/src/"]; // Ignore src
