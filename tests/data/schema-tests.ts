import { HrefSchema, PastYearSchema, TechnologySchema, TechnologySchemaWithKind, TimeRangeSchema, YearSchema } from "../../src/data/schema";

describe("TechnologySchema", () => {
    test("When parsing an empty string, then parse should fail", () => {
        const inputFake = "";
        expect(() => TechnologySchema.parse(inputFake)).toThrow();
    });
    test("When parsing a technology with a kind, then kind should not be null", () => {
        const inputFake = "db/some db";
        const result = TechnologySchema.parse(inputFake);
        expect(result.kind).toBe("db");
        expect(result.name).toBe("some db");
    });
    test("When parsing a technology without a kind, then kind should be null", () => {
        const inputFake = "some db";
        const result = TechnologySchema.parse(inputFake);
        expect(result.kind).toBeUndefined();
        expect(result.name).toBe("some db");
    });
    test("When parsing a technology without a kind and a slash, then kind should be null", () => {
        const inputFake = "not a kind/some db";
        const result = TechnologySchema.parse(inputFake);
        expect(result.kind).toBeUndefined();
        expect(result.name).toBe("not a kind/some db");
    });
});

describe("TechnologySchemaWithKind", () => {
    test("When parsing input without a kind, then parse should fail", () => {
        const inputFake = "not a kind/some db";
        expect(() => TechnologySchemaWithKind.parse(inputFake)).toThrow();
    });
});

describe("YearSchema", () => {
    test("When parsing a valid year, then parse should succeed", () => {
        const inputFake = 9999;
        expect(() => YearSchema.parse(inputFake)).not.toThrow();
    });
});

describe("PastYearSchema", () => {
    test("When parsing a future year, then parse should fail", () => {
        const inputFake = 9999;
        expect(() => PastYearSchema.parse(inputFake)).toThrow();
    });
});

describe("TimeRangeSchema", () => {
    test("When parsing with swapped years, then parse should fail", () => {
        const inputFake = {
            fromYear: 2000,
            toYear: 1900,
        };
        expect(() => TimeRangeSchema.parse(inputFake)).toThrow();
    });
    test("When parsing with a now to year, then parse should succeed", () => {
        const inputFake = {
            fromYear: 2000,
            toYear: "now",
        };
        expect(() => TimeRangeSchema.parse(inputFake)).not.toThrow();
    });
});

describe("HrefSchema", () => {
    test("When parsing a link without valid schema, then parse should fail", () => {
        const inputFake = "ftp://example.com";
        expect(() => HrefSchema.parse(inputFake)).toThrow();
    });
    test("When parsing a mailto link, then parse should succeed", () => {
        const inputFake = "mailto:hello@example.com";
        expect(() => HrefSchema.parse(inputFake)).not.toThrow();
    });
    test("When parsing a tel link, then parse should succeed", () => {
        const inputFake = "tel:+15555555555";
        expect(() => HrefSchema.parse(inputFake)).not.toThrow();
    });
    test("When parsing a tel in an invalid format, then parse should fail", () => {
        const inputFake = "tel:+blah";
        expect(() => HrefSchema.parse(inputFake)).toThrow();
    });
});
