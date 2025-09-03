import { useState } from "react";
import apiFetch from './apiFetch';
import useLocalStorage, { saveData } from "./useLocalStorage";

// creates a custom hook to simplify the App state management

const useResults = () => {
    // uses localStorage to persist search results
    const [result, setResult] = useLocalStorage();

    // sets state
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    // uses apiFetch function to call API and return either data or an error object, and sets state accordingly
    const returnResults = async (word) => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiFetch(word);
            setResult(data);
            console.log(data);
            saveData(data);
        } catch (error) {
            console.error('Error fetching results:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    return { result, error, loading, returnResults };
}

export default useResults;