import { useState } from "react";
import { defaultResult } from "./defaultResult";

const useLocalStorage = () => {
    const [storedValue, setStoredValue] = useState(() => {
        try {
            const item = window.localStorage.getItem("dictionary-data");
            return item ? JSON.parse(item) : defaultResult;
        } catch (error) {
            console.error("Error reading localStorage:", error);
            return defaultResult;
        }
    });

    return [storedValue, setStoredValue];
}

export const saveData = (data) => {
    try {
        window.localStorage.setItem("dictionary-data", JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export default useLocalStorage;