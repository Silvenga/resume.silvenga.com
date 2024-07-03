import type { JestConfigWithTsJest } from "ts-jest";

// eslint-disable-next-line require-await, @typescript-eslint/require-await
export default async (): Promise<JestConfigWithTsJest> => {
    return {
        verbose: true,
        testMatch: ["<rootDir>/tests/**/*-tests.ts"],
        preset: "ts-jest",
        testEnvironment: "node",
        transform: {
            "\\.yaml$": "jest-transform-yaml"
        }
    };
};
