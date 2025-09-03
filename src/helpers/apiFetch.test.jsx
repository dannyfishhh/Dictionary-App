import apiFetch from "./apiFetch";
import { describe, it, expect, vi, afterEach } from "vitest";

globalThis.fetch = vi.fn();

describe("apiFetch", () => {

    afterEach(() => {
        vi.clearAllMocks();
    })

    it("returns a JSON object when the fetch is successful", async () => {
        const mockData = [{word: 'test', meanings: []}];
        fetch.mockResolvedValueOnce({
            ok: true,
            json: async () => mockData
        })

        const result = await apiFetch('test');
        expect(fetch).toHaveBeenCalledWith('https://api.dictionaryapi.dev/api/v2/entries/en/test');
        expect(result).toEqual(mockData);
    });

    it("throws a 'not found' error when status is 404", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 404
        });

        const expected = { type: 'not found', message: "that word doesn't exist." };
        const result = apiFetch('fakeword');
        expect(result).rejects.toEqual(expected);
    });

    it("throws a 'network' error for other non-ok responses", async () => {
        fetch.mockResolvedValueOnce({
            ok: false,
            status: 500
        });

        const expected = { type: 'network', message: 'network response was not ok' };
        const result = apiFetch('networkerror');
        expect(result).rejects.toEqual(expected);
    
    });

    it("throws a 'fetch' error when the fetch itself rejects", async () => {
        fetch.mockRejectedValueOnce(new Error('Fetch failed'));

        const expected = { type: 'fetch', message: "couldn't connect to API." };
        const result = apiFetch('fetcherror');

        expect(result).rejects.toEqual(expected);
    });
});