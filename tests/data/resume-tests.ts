import { getResume } from "../../src/data/resume";

describe("getResume()", () => {
    test("When getting a resume, a valid resume should be returned", () => {
        const result = getResume();
        expect(result).toBeTruthy();
    });
});
