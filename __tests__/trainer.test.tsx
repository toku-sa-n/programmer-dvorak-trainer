// `userEvent.keyboard` does not work on console with `user-event` 14.*.
// See https://stackoverflow.com/questions/72273734/test-with-userevent-keyboard-does-not-pass-however-it-works-in-the-browser.
import React from "react";

import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockRandom } from "jest-mock-random";

import Trainer from "../components/trainer";

mockRandom(0.1);

test("The next key is highlighted", () => {
    render(<Trainer />);

    const key = screen.getByText("I");

    expect(key.classList).toContain("next");
});

describe("On typing the correct key", () => {
    test("Shifts the text to type by a character", () => {
        render(<Trainer />);

        const text = screen.getByText(
            'int main(void){printf("hello world");return 0;}'
        );

        userEvent.keyboard("i");

        expect(text.textContent).toBe(
            'nt main(void){printf("hello world");return 0;}'.replace(
                / /g,
                "\u00A0"
            )
        );
    });

    test("The next key is highlighted.", () => {
        render(<Trainer />);

        userEvent.keyboard("i");

        const key = screen.getByText("N");

        expect(key.classList).toContain("next");
    });
});

describe("On typing the wrong key", () => {
    test("It does not shift the text", () => {
        render(<Trainer />);

        const text = screen.getByText(
            'int main(void){printf("hello world");return 0;}'
        );

        userEvent.keyboard("a");

        expect(text.textContent).toBe(
            'int main(void){printf("hello world");return 0;}'.replace(
                / /g,
                "\u00A0"
            )
        );
    });

    test("The next key is highlighted.", () => {
        render(<Trainer />);

        userEvent.keyboard("a");

        const key = screen.getByText("I");

        expect(key.classList).toContain("next");
    });
});

// The same statement is returned as the next one as `Math.random` is mocked to return a fixed value, although in reality the next statement is selected at random.
test("Typing the last character shows the next sentence", () => {
    render(<Trainer />);

    const text = screen.getByText(
        'int main(void){printf("hello world");return 0;}'
    );

    userEvent.keyboard('int main(void){{printf("hello world");return 0;}}');

    expect(text.textContent).toBe(
        'int main(void){printf("hello world");return 0;}'.replace(
            / /g,
            "\u00A0"
        )
    );
});
