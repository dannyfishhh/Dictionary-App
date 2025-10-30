const transformResults = (data) => {
    // transforms API data into a simplified format for easier use in the app
    return {
        word: data[0].word,
        audio: data[0].phonetics[0]?.audio || null,
        wordType: data[0].meanings[0].partOfSpeech,
        definition: data[0].meanings[0].definitions[0].definition,
        example: data[0].meanings[0].definitions[0]?.example || null
    }
};

export { transformResults };