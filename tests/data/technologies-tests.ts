import { transformTechnology } from "../../src/data/technologies";

describe("transformTechnology()", () => {
    test("When parsing a technology with a kind, then kind should not be null", () => {
        const inputFake = "db/some db";
        const result = transformTechnology(inputFake);
        expect(result.kind).toBe("db");
        expect(result.name).toBe("some db");
    });
    test("When parsing a technology without a kind, then kind should be null", () => {
        const inputFake = "some db";
        const result = transformTechnology(inputFake);
        expect(result.kind).toBeUndefined();
        expect(result.name).toBe("some db");
    });
    test("When parsing a technology without a kind and a slash, then kind should be null", () => {
        const inputFake = "not a kind/some db";
        const result = transformTechnology(inputFake);
        expect(result.kind).toBeUndefined();
        expect(result.name).toBe("not a kind/some db");
    });
    test("When parsing a technology with a version, then version should be populated", () => {
        const inputFake = "something [1, 2, 3]";
        const result = transformTechnology(inputFake);
        expect(result.versions).toStrictEqual(["1", "2", "3"]);
    });
    test("When parsing a technology with a version, then versions should be unique.", () => {
        const inputFake = "something [1, 1, 1]";
        const result = transformTechnology(inputFake);
        expect(result.versions).toStrictEqual(["1"]);
    });
    test("When parsing a technology with a version, then name should not contain version.", () => {
        const inputFake = "something [1]";
        const result = transformTechnology(inputFake);
        expect(result.name).toBe("something");
    });
});
