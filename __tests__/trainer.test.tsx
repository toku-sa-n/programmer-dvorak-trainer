// `userEvent.keyboard` does not work on console with `user-event` 14.*.
// See https://stackoverflow.com/questions/72273734/test-with-userevent-keyboard-does-not-pass-however-it-works-in-the-browser.

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import React from "react";
import Trainer from "../components/trainer";

test("Typing the correct key shifts the text", () => {
    render(<Trainer />);

    const text = screen.getByText(
        'int main(void){printf("hello world");return 0;}'
    );

    userEvent.keyboard("i");

    expect(text.textContent).toBe(
        'nt main(void){printf("hello world");return 0;}'.replace(/ /g, "\u00A0")
    );
});
