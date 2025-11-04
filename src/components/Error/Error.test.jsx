import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import Error from './Error';

describe("Error component", () => {
    it("renders the error message", () => {

        const errorObject = { type: 'not found', message: "that word doesn't exist." };

        render(<Error error={errorObject} />);

        // test set up

        const headingElement = screen.getByText(/error/i);
        const typeElement = screen.getByText(/not found/i);
        const messageElement = screen.getByText(/that word doesn't exist./i);
        const solutionElement = screen.getByText(/please try again/i);

        // test results
        
        expect(headingElement).toBeInTheDocument();
        expect(typeElement).toBeInTheDocument();
        expect(messageElement).toBeInTheDocument();
        expect(solutionElement).toBeInTheDocument();
    });
});