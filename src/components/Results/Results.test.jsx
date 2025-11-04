import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from "vitest";
import Results from './Results';
import userEvent from "@testing-library/user-event";

describe("Results component", () => {

    let mockResult;

    it("Renders every element when the api provides all of the information", async () => {

        mockResult = {
            word: "play",
            audio: "https://api.dictionaryapi.dev/media/pronunciations/en/play-us.mp3",
            wordType: "noun",
            definition: "Activity for amusement only, especially among the young.",
            example: "Children learn through play."
        }
        
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
        mockResult = {
            word: "sweltering",
            wordType: "adjective",
            definition: "hot and humid; oppressively sticky"
        }
        
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

        mockResult = {
            word: "play",
            audio: "https://api.dictionaryapi.dev/media/pronunciations/en/play-us.mp3",
            wordType: "noun",
            definition: "Activity for amusement only, especially among the young.",
            example: "Children learn through play."
        };
        
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

        expect(window.Audio).toHaveBeenCalledWith(mockResult.audio);
        expect(playMock).toHaveBeenCalled();
    });

});