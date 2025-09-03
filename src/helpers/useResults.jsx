import { useState } from "react";
import apiFetch from './apiFetch';
import { defaultResult } from "./defaultResult";

const useResults = () => {
    const [result, setResult] = useState(defaultResult);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const returnResults = async (word) => {
        setError(null);
        setLoading(true);
        try {
            const data = await apiFetch(word);
            setResult(data);
            console.log(data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching results:', error);
            setError(error);
            setLoading(false);
        }
    };

    return { result, error, loading, returnResults };
}

export { useResults };