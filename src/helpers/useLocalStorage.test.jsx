import { renderHook } from "@testing-library/react";
import useLocalStorage, { saveData } from "./useLocalStorage";
import { defaultResult } from "./defaultResult";
import { describe, it, expect, beforeEach } from "vitest";

describe('useLocalStorage', () => {

    beforeEach(() => {
        localStorage.clear();
    });

    it('should initialize with default value when localStorage is empty', () => {
        const { result } = renderHook(() => useLocalStorage());
        expect(result.current[0]).toEqual(defaultResult);
    });

    it('should initialize with value from localStorage if available', () => {
        const mockData = [{ word: "example", meanings: [] }];
        saveData(mockData);
        const { result } = renderHook(() => useLocalStorage());
        expect(result.current[0]).toEqual(mockData);
    });

})