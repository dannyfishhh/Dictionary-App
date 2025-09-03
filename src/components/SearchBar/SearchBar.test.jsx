import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from "vitest";
import SearchBar from './SearchBar';
import userEvent from "@testing-library/user-event";

describe("SearchBar component", () => {

    // mocks the returnResults function

    const mockReturnResults = vi.fn();

    it("renders the search bar component", () => {
        render(<SearchBar returnResults={mockReturnResults}/>);

        // test set up

        const inputElement = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        // test results

        expect(inputElement).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("displays an error if no word is entered upon search", async () => {
         render(<SearchBar returnResults={mockReturnResults}/>);

         // test set up

        const inputElement = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        // test action simulating user clicking the search button with an empty input

        await userEvent.click(submitButton);

        const errorMessage = screen.getByText('Please enter a word to search.');

        // test results

        expect(errorMessage).toBeInTheDocument();

        // test action simulating clicking on the input box after error message to clear it

        await userEvent.click(inputElement);

        // test results

        expect(errorMessage).not.toBeInTheDocument();
    });

    it("fires the handleSubmit upon search", async () => {
        render(<SearchBar returnResults={mockReturnResults}/>);

        // test set up

        const inputElement = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        // test actions simulating genuine search entry

        await userEvent.type(inputElement, 'hello');
        await userEvent.click(submitButton);

        // test results with spy simulating the search function

        expect(mockReturnResults).toHaveBeenCalledWith('hello');
    });
});