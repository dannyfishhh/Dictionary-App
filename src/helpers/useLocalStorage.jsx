import { useState } from "react";
import { defaultResult } from "./defaultResult";

// a custom hook for handling localStorage persistance

const useLocalStorage = () => {
    const [storedValue, setStoredValue] = useState(() => {

        try {
            // checks for local storage, and if it is empty, uses defaultResult
            const item = window.localStorage.getItem("dictionary-data");
            return item ? JSON.parse(item) : defaultResult;
        } catch (error) {
            // sets default result if there is an error checking for localStorage
            console.error("Error reading localStorage:", error);
            return defaultResult;
        }
    });

    return [storedValue, setStoredValue];
}

// a helper function for saving data to localStorage

export const saveData = (data) => {
    try {
        window.localStorage.setItem("dictionary-data", JSON.stringify(data));
    } catch (error) {
        console.error("Error saving to localStorage:", error);
    }
};

export default useLocalStorage;