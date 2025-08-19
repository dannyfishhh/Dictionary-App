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

const defaultResult = [{"word":"joy","phonetic":"/dʒɔɪ/","phonetics":[{"text":"/dʒɔɪ/","audio":""},{"text":"/dʒɔɪ/","audio":""},{"text":"/dʒɔɪ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/joy-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1212428","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"A feeling of extreme happiness or cheerfulness, especially related to the acquisition or expectation of something good.","synonyms":[],"antonyms":[],"example":"They will be a source of strength and joy in your life."},{"definition":"Anything that causes such a feeling.","synonyms":[],"antonyms":[],"example":"the joys and demands of parenthood"},{"definition":"Luck or success; a positive outcome.","synonyms":[],"antonyms":[]},{"definition":"The sign or exhibition of joy; gaiety; merriment; festivity.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":["infelicity","joylessness","unhappiness","unjoy"]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/joy"]},{"word":"joy","phonetic":"/dʒɔɪ/","phonetics":[{"text":"/dʒɔɪ/","audio":""},{"text":"/dʒɔɪ/","audio":""},{"text":"/dʒɔɪ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/joy-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1212428","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"verb","definitions":[{"definition":"To feel joy, to rejoice.","synonyms":[],"antonyms":[]},{"definition":"To enjoy.","synonyms":[],"antonyms":[]},{"definition":"To give joy to; to congratulate.","synonyms":[],"antonyms":[]},{"definition":"To gladden; to make joyful; to exhilarate.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/joy"]}]

export { defaultResult };

export default apiFetch;