import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

// mocks the apiFetch module so I can specifically test the custom hook logic
vi.mock('./apiFetch', () => ({
    default: vi.fn()
}));

import apiFetch from './apiFetch';
import useResults from "./useResults";

describe('useResults', () => {

    it('should set results when a successful fetch is made', async () => {
        // sets the mock data to a successful return from the API
        const mockData = [{word: 'test', meanings: []}];
        apiFetch.mockResolvedValueOnce(mockData);

        // renders hook in isolation
        const { result } = renderHook(() => useResults());

        // triggers the mocked API call
        await act(async () => {
            await result.current.returnResults('test');
        })

        // test result
        expect(result.current.result).toEqual(mockData);
    });

    it('should set error when a fetch fails', async () => {
        // sets the mock data to a rejected return from the API
        const mockError = new Error('Fetch failed');
        apiFetch.mockRejectedValueOnce(mockError);

        // renders hook in isolation
        const { result } = renderHook(() => useResults());

        // triggers the mocked API call
        await act(async () => {
            await result.current.returnResults('test');
        })

        // test results
        expect(result.current.error).toEqual(mockError);
    });

})