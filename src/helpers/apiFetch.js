// separated the API call into a distinct function for better testing
// this function directly returns custom errors depending on the fetch request for a specific word

const apiFetch = async (word) => {
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;

    try {
        // the API call
        const response = await fetch(apiUrl);

        // if there's an invalid response, throw corresponding error
        if (!response.ok) {
            if (response.status === 404) {
                throw { type: 'not found', message: "that word doesn't exist." };
            } else {
                throw { type: 'network', message: 'network response was not ok' };
            }
        }

        //otherwise return object
        return await response.json();
    } catch (error) {
        
        // log error
        console.error('There has been a problem with your fetch operation:', error);

        // if unknown error object thrown, make new custom error
        if (error && error.type && error.message) {
            throw error;
        } else {
        throw { type: 'fetch', message: "couldn't connect to API." };
        }
    }
}

export default apiFetch;