import { transformResults } from "./transformResults.js";
import { describe, it, expect } from "vitest";

describe("transformResults", () => {

    it("transforms API response into desired format", () => {

        // test mocks set up
        const apiResponse = [
            {
                word: "test",
                phonetics: [{ audio: "test.mp3" }],
                meanings: [
                    {
                        partOfSpeech: "noun",
                        definitions: [
                            { definition: "a test definition", example: "an example" }
                        ]
                    }
                ]
            }
        ];

        const expected = {
            word: "test",
            audio: "test.mp3",
            wordType: "noun",
            definition: "a test definition",
            example: "an example"
        };

        // function call
        const result = transformResults(apiResponse);

        // test results
        expect(result).toEqual(expected);
    });

    it("handles missing audio and example fields", () => {

        // test mocks set up
        const apiResponse = [
            {
                word: "test",
                phonetics: [{ audio: "" }],
                meanings: [
                    {
                        partOfSpeech: "noun",
                        definitions: [
                            { definition: "a test definition", example: "" }
                        ]
                    }
                ]
            }
        ];

        const expected = {
            word: "test",
            audio: null,
            wordType: "noun",
            definition: "a test definition",
            example: null
        };

        // function call
        const result = transformResults(apiResponse);

        // test results
        expect(result).toEqual(expected);
    });
});