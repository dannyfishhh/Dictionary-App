import React from "react";
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { describe, it, expect } from "vitest";
import Loading from './Loading';

describe("Loading component", () => {
    it("renders the loading screen", () => {
        render(<Loading />);

        const skeletonElements = screen.getAllByRole('loading');

        expect(skeletonElements).toHaveLength(4);
    });
});