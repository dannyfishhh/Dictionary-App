const apiFetch = async (word) => {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            if (response.status === 404) {
                throw { type: 'not found', message: "that word doesn't exist." };
            } else {
                throw { type: 'network', message: 'network response was not ok' };
            }
        }
        return await response.json();
    } catch (error) {
        console.error('There has been a problem with your fetch operation:', error);
        if (error && error.type && error.message) {
            throw error;
        } else {
        throw { type: 'fetch', message: "couldn't connect to API." };
        }
    }
}

export default apiFetch;