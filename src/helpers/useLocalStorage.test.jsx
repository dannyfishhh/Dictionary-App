import { renderHook } from "@testing-library/react";
import useLocalStorage, { saveData } from "./useLocalStorage";
import { defaultResult } from "./defaultResult";
import { describe, it, expect, beforeEach } from "vitest";

describe('useLocalStorage', () => {

    // clears localStorage before each test
    beforeEach(() => {
        localStorage.clear();
    });

    it('should initialize with default value when localStorage is empty', () => {
        // renders hook
        const { result } = renderHook(() => useLocalStorage());

        // test results
        expect(result.current[0]).toEqual(defaultResult);
    });

    it('should initialize with value from localStorage if available', () => {
        // sets local storage to a set of mocked data
        const mockData = [{ word: "example", meanings: [] }];
        saveData(mockData);

        // renders hook
        const { result } = renderHook(() => useLocalStorage());

        // test results
        expect(result.current[0]).toEqual(mockData);
    });

})