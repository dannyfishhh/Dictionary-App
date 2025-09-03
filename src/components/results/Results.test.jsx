import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from "vitest";
import Results from './Results';
import userEvent from "@testing-library/user-event";

describe("Results component", () => {

    let mockResult;

    it("Renders every element when the api provides all of the information", async () => {

        mockResult = [{"word":"play","phonetic":"/pleɪ/","phonetics":[{"text":"/pleɪ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/play-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1118856","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"Activity for amusement only, especially among the young.","synonyms":[],"antonyms":[],"example":"Children learn through play."},{"definition":"Similar activity in young animals, as they explore their environment and learn new skills.","synonyms":[],"antonyms":[],"example":"This kind of play helps the young lion cubs develop their hunting skills."},{"definition":"The conduct, or course, of a game.","synonyms":[],"antonyms":[],"example":"After the rain break, play resumed at 3 o'clock."},{"definition":"An individual's performance in a sport or game.","synonyms":[],"antonyms":[],"example":"His play has improved a lot this season."},{"definition":"A short sequence of action within a game.","synonyms":[],"antonyms":[],"example":"That was a great play by the Mudchester Rovers forward."},{"definition":"(turn-based games) An action carried out when it is one's turn to play.","synonyms":["move"],"antonyms":[]},{"definition":"A literary composition, intended to be represented by actors impersonating the characters and speaking the dialogue.","synonyms":["drama"],"antonyms":[],"example":"This book contains all of Shakespeare's plays."},{"definition":"A theatrical performance featuring actors.","synonyms":[],"antonyms":[],"example":"We saw a two-act play in the theatre."},{"definition":"A major move by a business or investor.","synonyms":[],"antonyms":[],"example":"ABC Widgets makes a play in the bicycle market with its bid to take over Acme Sprockets."},{"definition":"A geological formation that contains an accumulation or prospect of hydrocarbons or other resources.","synonyms":[],"antonyms":[]},{"definition":"The extent to which a part of a mechanism can move freely.","synonyms":[],"antonyms":[],"example":"No wonder the fanbelt is slipping: there’s too much play in it."},{"definition":"Sexual activity or sexual role-playing.","synonyms":[],"antonyms":[]},{"definition":"An instance of watching or listening to digital media.","synonyms":["listen","view"],"antonyms":[]},{"definition":"A button that, when pressed, causes media to be played.","synonyms":[],"antonyms":[]},{"definition":"(now usually in compounds) Activity relating to martial combat or fighting.","synonyms":[],"antonyms":[]}],"synonyms":["drama","listen","view","move"],"antonyms":[]},{"partOfSpeech":"verb","definitions":[{"definition":"To act in a manner such that one has fun; to engage in activities expressly for the purpose of recreation or entertainment.","synonyms":[],"antonyms":[],"example":"They played long and hard."},{"definition":"To perform in (a sport); to participate in (a game).","synonyms":[],"antonyms":[],"example":"He plays on three teams"},{"definition":"To take part in amorous activity; to make love.","synonyms":["get it on","have sex","make out"],"antonyms":[]},{"definition":"To act as the indicated role, especially in a performance.","synonyms":[],"antonyms":[],"example":"He plays the King, and she's the Queen."},{"definition":"(heading) To produce music or theatre.","synonyms":[],"antonyms":[]},{"definition":"(heading) To behave in a particular way.","synonyms":[],"antonyms":[]},{"definition":"To move in any manner; especially, to move regularly with alternate or reciprocating motion; to operate.","synonyms":[],"antonyms":[],"example":"He played the torch beam around the room."},{"definition":"To move to and fro.","synonyms":[],"antonyms":[]},{"definition":"To put in action or motion.","synonyms":[],"antonyms":[],"example":"to play a trump in a card game"},{"definition":"To keep in play, as a hooked fish in order to land it.","synonyms":[],"antonyms":[]},{"definition":"To manipulate, deceive, or swindle someone.","synonyms":["defraud"],"antonyms":[],"example":"You played me!"}],"synonyms":["defraud","get it on","have sex","make out"],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/play"]}];

        render(<Results result={mockResult} />);

        // test set up

        const header = await screen.findByRole('heading', { name: /play/i });
        const wordType = await screen.findByText(/noun/i);
        const soundButton = await screen.findByAltText('Brand Awareness Icon');
        const definition = await screen.findByText(/Activity for amusement only, especially among the young/i);
        const exampleSentence = await screen.findByText(/Children learn through play/i);

        // test results

        expect(header).toBeInTheDocument();
        expect(wordType).toBeInTheDocument();
        expect(soundButton).toBeInTheDocument();
        expect(definition).toBeInTheDocument();
        expect(exampleSentence).toBeInTheDocument();
    })

    it("Only renders the items it has information for", () => {
        mockResult = [{"word":"sweltering","phonetics":[],"meanings":[{"partOfSpeech":"verb","definitions":[{"definition":"To suffer terribly from intense heat.","synonyms":[],"antonyms":[]},{"definition":"To perspire greatly from heat.","synonyms":[],"antonyms":[]},{"definition":"To cause to faint, to overpower, as with heat.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]},{"partOfSpeech":"noun","definitions":[{"definition":"The situation of being or feeling hot and humid.","synonyms":[],"antonyms":[]}],"synonyms":[],"antonyms":[]},{"partOfSpeech":"adjective","definitions":[{"definition":"(of weather) hot and humid; oppressively sticky","synonyms":[],"antonyms":[],"example":"The day was sweltering, so Lauren put on the shortest pair of shorts she could find and went to get ice-cream with her friend Rob."}],"synonyms":[],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/swelter","https://en.wiktionary.org/wiki/sweltering"]}]

        render(<Results result={mockResult} />);

        // test set up

        const soundButton = screen.queryByAltText('Brand Awareness Icon');
        const paragraphs = screen.queryAllByRole('paragraph');

        // test results

        expect(soundButton).toBe(null);
        expect(paragraphs).toHaveLength(1);
    });

    it("Plays sound upon click", async () => {

        // mocks the audio class play method

        mockResult = mockResult = [{"word":"play","phonetic":"/pleɪ/","phonetics":[{"text":"/pleɪ/","audio":"https://api.dictionaryapi.dev/media/pronunciations/en/play-us.mp3","sourceUrl":"https://commons.wikimedia.org/w/index.php?curid=1118856","license":{"name":"BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"}}],"meanings":[{"partOfSpeech":"noun","definitions":[{"definition":"Activity for amusement only, especially among the young.","synonyms":[],"antonyms":[],"example":"Children learn through play."},{"definition":"Similar activity in young animals, as they explore their environment and learn new skills.","synonyms":[],"antonyms":[],"example":"This kind of play helps the young lion cubs develop their hunting skills."},{"definition":"The conduct, or course, of a game.","synonyms":[],"antonyms":[],"example":"After the rain break, play resumed at 3 o'clock."},{"definition":"An individual's performance in a sport or game.","synonyms":[],"antonyms":[],"example":"His play has improved a lot this season."},{"definition":"A short sequence of action within a game.","synonyms":[],"antonyms":[],"example":"That was a great play by the Mudchester Rovers forward."},{"definition":"(turn-based games) An action carried out when it is one's turn to play.","synonyms":["move"],"antonyms":[]},{"definition":"A literary composition, intended to be represented by actors impersonating the characters and speaking the dialogue.","synonyms":["drama"],"antonyms":[],"example":"This book contains all of Shakespeare's plays."},{"definition":"A theatrical performance featuring actors.","synonyms":[],"antonyms":[],"example":"We saw a two-act play in the theatre."},{"definition":"A major move by a business or investor.","synonyms":[],"antonyms":[],"example":"ABC Widgets makes a play in the bicycle market with its bid to take over Acme Sprockets."},{"definition":"A geological formation that contains an accumulation or prospect of hydrocarbons or other resources.","synonyms":[],"antonyms":[]},{"definition":"The extent to which a part of a mechanism can move freely.","synonyms":[],"antonyms":[],"example":"No wonder the fanbelt is slipping: there’s too much play in it."},{"definition":"Sexual activity or sexual role-playing.","synonyms":[],"antonyms":[]},{"definition":"An instance of watching or listening to digital media.","synonyms":["listen","view"],"antonyms":[]},{"definition":"A button that, when pressed, causes media to be played.","synonyms":[],"antonyms":[]},{"definition":"(now usually in compounds) Activity relating to martial combat or fighting.","synonyms":[],"antonyms":[]}],"synonyms":["drama","listen","view","move"],"antonyms":[]},{"partOfSpeech":"verb","definitions":[{"definition":"To act in a manner such that one has fun; to engage in activities expressly for the purpose of recreation or entertainment.","synonyms":[],"antonyms":[],"example":"They played long and hard."},{"definition":"To perform in (a sport); to participate in (a game).","synonyms":[],"antonyms":[],"example":"He plays on three teams"},{"definition":"To take part in amorous activity; to make love.","synonyms":["get it on","have sex","make out"],"antonyms":[]},{"definition":"To act as the indicated role, especially in a performance.","synonyms":[],"antonyms":[],"example":"He plays the King, and she's the Queen."},{"definition":"(heading) To produce music or theatre.","synonyms":[],"antonyms":[]},{"definition":"(heading) To behave in a particular way.","synonyms":[],"antonyms":[]},{"definition":"To move in any manner; especially, to move regularly with alternate or reciprocating motion; to operate.","synonyms":[],"antonyms":[],"example":"He played the torch beam around the room."},{"definition":"To move to and fro.","synonyms":[],"antonyms":[]},{"definition":"To put in action or motion.","synonyms":[],"antonyms":[],"example":"to play a trump in a card game"},{"definition":"To keep in play, as a hooked fish in order to land it.","synonyms":[],"antonyms":[]},{"definition":"To manipulate, deceive, or swindle someone.","synonyms":["defraud"],"antonyms":[],"example":"You played me!"}],"synonyms":["defraud","get it on","have sex","make out"],"antonyms":[]}],"license":{"name":"CC BY-SA 3.0","url":"https://creativecommons.org/licenses/by-sa/3.0"},"sourceUrls":["https://en.wiktionary.org/wiki/play"]}];
        const playMock = vi.fn();
        window.Audio = vi.fn(() => ({
            play: playMock
        }));

        // test set up

        render(<Results result={mockResult} />);

        const soundButton = await screen.findByAltText('Brand Awareness Icon');

        // test actions simulaitng sound button click

        await userEvent.click(soundButton);

        // test results

        expect(window.Audio).toHaveBeenCalledWith(mockResult[0].phonetics[0].audio);
        expect(playMock).toHaveBeenCalled();
    });

});