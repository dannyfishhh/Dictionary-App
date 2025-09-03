import { describe, it, expect, vi, afterEach } from "vitest";
import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import userEvent from "@testing-library/user-event";

vi.mock('./helpers/apiFetch', () => ({
    default: vi.fn()
}));

import apiFetch from "./helpers/apiFetch";
import App from './App';

describe("App", () => {

    afterEach(() => {
        vi.clearAllMocks();
        localStorage.clear();
    })

    it("Should have correct landing page", () => {
        render(<App />);

        //test set up

        const searchBar = screen.getByTestId('searchBar');
        const results = screen.getByTestId('results');

        // test results 

        expect(searchBar).toBeInTheDocument();
        expect(results).toBeInTheDocument();
    });

    it("Should show loading when fetching", async () => {

        // sets the mocked data from apiFetch as a promise with a delay in order to better reflect the data returned by the function and give the test more time to find the loading component

        const mockResult = [{"word":"test","phonetic":"/test/","phonetics":[{"text":"/test/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=9014228","license":{"name":"BY 3.0 US","url":"https://creativecommons.org/licenses/by/3.0/us"}},{"text":"/test/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1197419","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"A challenge, trial.","synonyms":[],"antonyms":[]},{"definition":"A cupel or cupelling hearth in which precious metals are melted for trial and refinement.","synonyms":[],"antonyms":[]},{"definition":"(academia) An examination, given often during the academic term.","synonyms":[],"antonyms":[]},{"definition":"A session in which a product or piece of equipment is examined under everyday or extreme conditions to evaluate its durability, etc.","synonyms":[],"antonyms":[]},{"definition":"(normally “Test”) A Test match.","synonyms":[],"antonyms":[]},{"definition":"The external calciferous shell, or endoskeleton, of an echinoderm, e.g. sand dollars and sea urchins.","synonyms":[],"antonyms":[]},{"definition":"Testa; seed coat.","synonyms":[],"antonyms":[]},{"definition":"Judgment; distinction; discrimination.","synonyms":[],"antonyms":[]}],"synonyms":["examination","quiz"],"antonyms":["recess"]},{"partOfSpeech":"verb","definitions":[{"definition":"To challenge.","synonyms":[],"antonyms":[],"example":"Climbing the mountain tested our stamina."},{"definition":"To refine (gold, silver, etc.) in a test or cupel; to subject to cupellation.","synonyms":[],"antonyms":[]},{"definition":"To put to the proof; to prove the truth, genuineness, or quality of by experiment, or by some principle or standard; to try.","synonyms":[],"antonyms":[],"example":"to test the soundness of a principle; to test the validity of an argument"},{"definition":"(academics) To administer or assign an examination, often given during the academic term, to (somebody).","synonyms":[],"antonyms":[]},{"definition":"To place a product or piece of equipment under everyday and/or extreme conditions and examine it for its durability, etc.","synonyms":[],"antonyms":[]},{"definition":"To be shown to be by test.","synonyms":[],"antonyms":[],"example":"He tested positive for cancer."},{"definition":"To examine or try, as by the use of some reagent.","synonyms":[],"antonyms":[],"example":"to test a solution by litmus paper"}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/test"]},{"word":"test","phonetic":"/test/","phonetics":[{"text":"/test/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=9014228","license":{"name":"BY 3.0 US","url":"https://creativecommons.org/licenses/by/3.0/us"}},{"text":"/test/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1197419","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"A witness.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]},{"partOfSpeech":"verb","definitions":[{"definition":"To attest (a document) legally, and date it.","synonyms":[],"antonyms":[]},{"definition":"To make a testament, or will.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/test"]},{"word":"test","phonetic":"/test/","phonetics":[{"text":"/test/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/test-uk.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=9014228","license":{"name":"BY 3.0 US","url":"https://creativecommons.org/licenses/by/3.0/us"}},{"text":"/test/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/test-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1197419","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"(body building) testosterone","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/test"]}];
        const delayedPromise = new Promise(resolve => {
            setTimeout(() => resolve(mockResult), 1000);
        });
        apiFetch.mockResolvedValueOnce(delayedPromise);

        render(<App />);

        // test set up

        const searchBar = screen.getByTestId('searchBar');
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', {name: /search/i});

        // test actions simulating user typing in the search bar and clicking the search button

        await userEvent.type(input, 'test')
        await userEvent.click(button)

        // test results as actions unfold

        const loading = await screen.findByTestId('loading');
        expect(loading).toBeInTheDocument();
        expect(searchBar).toBeInTheDocument();
        const results = await screen.findByTestId('results');
        expect(results).toBeInTheDocument();
    });

    it("Should show the error screen if the fetch fails", async () => {
        
        // sets a specific error type as the mock data

        const mockResult = { type: 'not found', message: "that word doesn't exist." };
        apiFetch.mockRejectedValueOnce(mockResult);

        render(<App />);

        // test set up

        const searchBar = screen.getByTestId('searchBar');
        const input = screen.getByRole('textbox');
        const button = screen.getByRole('button', {name: /search/i});

        // test actions simulating user typing in the search bar and clicking the search button

        await userEvent.type(input, 'test')
        await userEvent.click(button)

        // test results

        const error = await screen.findByTestId('error');
        expect(error).toBeInTheDocument();
        expect(searchBar).toBeInTheDocument();
    });

})