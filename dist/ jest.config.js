"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modulePathIgnorePatterns = exports.testMatch = exports.testEnvironment = exports.preset = void 0;
exports.preset = "ts-jest";
exports.testEnvironment = "node";
exports.testMatch = ["**/dist/**/*.test.js"]; // Target .js files in dist
exports.modulePathIgnorePatterns = ["<rootDir>/src/"]; // Ignore src
