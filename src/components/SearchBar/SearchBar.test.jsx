import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect, vi } from "vitest";
import SearchBar from './SearchBar';
import userEvent from "@testing-library/user-event";

describe("SearchBar component", () => {

    const mockReturnResults = vi.fn();

    it("renders the search bar component", () => {
        render(<SearchBar returnResults={mockReturnResults}/>);

        const inputElement = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        expect(inputElement).toBeInTheDocument();
        expect(submitButton).toBeInTheDocument();
    });

    it("displays an error if no word is entered upon search", async () => {
         render(<SearchBar returnResults={mockReturnResults}/>);

        const inputElement = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        await userEvent.click(submitButton);

        const errorMessage = screen.getByText('Please enter a word to search.');

        expect(errorMessage).toBeInTheDocument();

        await userEvent.click(inputElement);

        expect(errorMessage).not.toBeInTheDocument();
    });

    it("fires the handleSubmit upon search", async () => {
        render(<SearchBar returnResults={mockReturnResults}/>);

        const inputElement = screen.getByRole('textbox');
        const submitButton = screen.getByRole('button', { name: /search/i });

        await userEvent.type(inputElement, 'hello');
        await userEvent.click(submitButton);

        expect(mockReturnResults).toHaveBeenCalledWith('hello');
    });
});