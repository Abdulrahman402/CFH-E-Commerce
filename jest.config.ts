module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  testMatch: ["**/__tests__/**/*.ts?(x)", "**/?(*.)+(spec|test).ts?(x)"],
  moduleFileExtensions: ["ts", "js", "json", "node"],
  transform: {
    "^.+\\.ts$": "babel-jest",
  },
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.json",
    },
  },
  setupFilesAfterEnv: ["./src/__test__/test-setup.ts"],
};
