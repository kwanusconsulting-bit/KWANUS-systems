/** @type {import("jest").Config} */
module.exports = {
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["@testing-library/jest-dom"],
    moduleNameMapper: {
        "^@/(.*)$": "<rootDir>/$1"
    },
    testMatch: [
        "<rootDir>/tests/unit/**/*.test.(ts|tsx)",
        "<rootDir>/tests/integration/**/*.test.(ts|tsx)",
        "<rootDir>/tests/resilience/**/*.test.(ts|tsx)",
        "<rootDir>/tests/security/**/*.test.(ts|tsx)"
    ],
    transform: {
        "^.+\\.(ts|tsx)$": "ts-jest"
    }
};
