This application makes use of a free dictionary API in order to return the word type, definition, example, and a playable sound.

It makes use of custom hooks to keep the App component clean, and an apiFetch function to keep the custom hooks clean.

The default screen is the results for the word 'joy' because it makes me happy! And as you search the previous search will be persisted in the localStorage.

There is component testing to check the each element renders properly within each component, and changes under the correct circumstances, and also integration testing to check these elements render under the relevant user events.

The styling should be responsive to all sizes from a large laptop through to an iPhone SE.