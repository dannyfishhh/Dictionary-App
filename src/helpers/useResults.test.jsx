import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";

vi.mock('./apiFetch', () => ({
    default: vi.fn()
}));

import apiFetch from './apiFetch';
import useResults from "./useResults";

describe('useResults', () => {

    it('should set results when a successful fetch is made', async () => {
        const mockData = [{word: 'test', meanings: []}];
        apiFetch.mockResolvedValueOnce(mockData);

        const { result } = renderHook(() => useResults());

        await act(async () => {
            await result.current.returnResults('test');
        })

        expect(result.current.result).toEqual(mockData);
    });

    it('should set error when a fetch fails', async () => {
        const mockError = new Error('Fetch failed');
        apiFetch.mockRejectedValueOnce(mockError);

        const { result } = renderHook(() => useResults());

        await act(async () => {
            await result.current.returnResults('test');
        })

        expect(result.current.error).toEqual(mockError);
    });

})