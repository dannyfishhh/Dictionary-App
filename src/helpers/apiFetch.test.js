import apiFetch from "./apiFetch";
import { describe, it, expect, vi, afterEach } from "vitest";

// mock all fetch calls to test the logic in apiFetch function
globalThis.fetch = vi.fn();

describe("apiFetch", () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    it("returns a JSON object when the fetch is successful", async () => {
        
        // sets mock API response shaped like the real API (an array)
        const mockApiResponse = [
            {
                word: 'test',
                phonetics: [{ audio: '' }],
                meanings: [
                    { partOfSpeech: 'noun', definitions: [{ definition: 'a test definition', example: 'an example' }] }
                ]
            }
        ];
        // expected transformed data
        const mockTransformedData = {
           word: "test",
           audio: null,
           wordType: "noun",
           definition: "a test definition",
           example: "an example"
        };

        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockApiResponse
        });

        // mock API function call
        const result = await apiFetch('test');

        // test results
        expect(fetch).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/test');
        expect(result).toEqual(mockTransformedData);
    });

    it("throws a 'not found' error when status is 404", async () => {
        // sets mock API response as a 404 response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        // test set up
        const expected = { type: 'not found', message: "that word doesn't exist." };

        // test result
        // mocked API call occurs in here for better error handling
        expect(apiFetch('fakeword')).rejects.toEqual(expected);
    });

    it("throws a 'network' error for other non-ok responses", async () => {
        // sets mock API response for any other non-ok response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        // test set up
        const expected = { type: 'network', message: 'network response was not ok' };

        // test results
        // mocked API call occurs in here for better error handling
        expect(apiFetch('networkerror')).rejects.toEqual(expected);
    
    });

    it("throws a 'fetch' error when the fetch itself rejects", async () => {
        // sets the mocked data to a thrown error from the api
        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        // test set up and mocked API call
        const expected = { type: 'fetch', message: "couldn't connect to API." };

        // test results
        // mocked API call occurs in here for better error handling
        expect(apiFetch('fetcherror')).rejects.toEqual(expected);
    });
});