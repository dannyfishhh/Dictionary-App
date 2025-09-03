import apiFetch from "./apiFetch";
import { describe, it, expect, vi, afterEach } from "vitest";

// mock all fetch calls to test the logic in apiFetch function
globalThis.fetch = vi.fn();

describe("apiFetch", () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    it("returns a JSON object when the fetch is successful", async () => {
        
        //sets mockData as a valid response
        const mockData = [{word: 'test', meanings: []}];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        })

        // mock API function call
        const result = await apiFetch('test');

        // test results
        expect(fetch).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/test');
        expect(result).toEqual(mockData);
    });

    it("throws a 'not found' error when status is 404", async () => {
        // sets mock API response as a 404 response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        // test set up and mocked API call
        const expected = { type: 'not found', message: "that word doesn't exist." };
        const result = apiFetch('fakeword');

        // test result
        expect(result).rejects.toEqual(expected);
    });

    it("throws a 'network' error for other non-ok responses", async () => {
        // sets mock API response for any other non-ok response
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        // test set up and mocked API call
        const expected = { type: 'network', message: 'network response was not ok' };
        const result = apiFetch('networkerror');

        // test results
        expect(result).rejects.toEqual(expected);
    
    });

    it("throws a 'fetch' error when the fetch itself rejects", async () => {
        // sets the mocked data to a thrown error from the api
        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        // test set up and mocked API call
        const expected = { type: 'fetch', message: "couldn't connect to API." };
        const result = apiFetch('fetcherror');

        // test results
        expect(result).rejects.toEqual(expected);
    });
});