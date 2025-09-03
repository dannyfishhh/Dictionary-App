import { useState } from "react";
import apiFetch from './apiFetch';
import useLocalStorage, { saveData } from "./useLocalStorage";

const useResults = () => {
    const [result, setResult] = useLocalStorage();
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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