// `userEvent.keyboard` does not work on console with `user-event` 14.*.
// See https://stackoverflow.com/questions/72273734/test-with-userevent-keyboard-does-not-pass-however-it-works-in-the-browser.
import React from "react";

import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockRandom } from "jest-mock-random";

import Trainer from "../components/trainer";
import escapeSpace from "../libs/escapeSpace";

mockRandom(0.2);

test("The next key is highlighted", () => {
    renderTrainer();

    expectKeyIsHighlighted("I");
});

describe("On typing the correct key", () => {
    describe("The next key is a lowercase alphabet", () => {
        test("Shifts the text to type by a character", () => {
            expectDisplayAfterTyping(
                "i",
                'nt main(void){printf("hello world");return 0;}'
            );
        });

        test("The next key is highlighted.", () => {
            renderTrainer();

            userEvent.keyboard("i");

            expectKeyIsHighlighted("N");
        });
    });

    describe("Typing the last character", () => {
        // The same statement is returned as the next one as `Math.random` is
        // mocked to return a fixed value, although in reality the next
        // statement is selected at random.
        test("The next sentence is showed", () => {
            expectDisplayAfterTyping(
                'int main(void){printf("hello world");return 0;}',
                'int main(void){printf("hello world");return 0;}'
            );
        });
    });
});

test("Shift keys are highlighted if the next key is a number", () => {
    renderTrainer();

    userEvent.keyboard('int main(void){{printf("hello world");return ');

    // For some reasons, `"*"` instead of `/\*/` does not work.
    const nextKey = screen.getByText(/\*/);

    expect(nextKey.parentElement?.classList).toContain("next");

    const shiftKeys = screen.getAllByText("Shift");

    shiftKeys.forEach((key) => {
        expect(key.parentElement?.classList).toContain("next");
    });
});

describe("On typing the wrong key", () => {
    test("It does not shift the text", () => {
        expectDisplayAfterTyping(
            "a",
            'int main(void){printf("hello world");return 0;}'
        );
    });

    test("The next key is highlighted.", () => {
        renderTrainer();

        userEvent.keyboard("a");

        expectKeyIsHighlighted("I");
    });
});

function expectKeyIsHighlighted(text: string): void {
    const key = screen.getByText(text);

    expect(key.parentElement?.classList).toContain("next");
}

function expectDisplayAfterTyping(textToType: string, expected: string): void {
    renderTrainer();

    // The first "i" is intentionally omitted. This is because the "i" is
    // enclosed in `<span>`, and therefore `getByText` will fail if it is
    // included.
    // https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library
    // describes how to deal with such cases. However, I decided to simply omit
    // the first "i" because, to be honest, it's a bit of a pain.
    const text = screen.getByText(
        'nt main(void){printf("hello world");return 0;}'
    );

    // See https://testing-library.com/docs/user-event/keyboard/ for why we need this.
    const escapedTextToType = textToType
        .replace(/\{/, "{{")
        .replace(/\[/, "[[");

    userEvent.keyboard(escapedTextToType);

    expect(text.textContent).toBe(escapeSpace(expected));
}

function renderTrainer() {
    const typingTexts = [
        'int main(void){printf("hello world");return 0;}',
        "foo bar",
    ];

    render(<Trainer typingTexts={typingTexts} />);
}
