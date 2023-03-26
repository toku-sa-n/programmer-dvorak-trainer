// `userEvent.keyboard` does not work on console with `user-event` 14.*.
// See https://stackoverflow.com/questions/72273734/test-with-userevent-keyboard-does-not-pass-however-it-works-in-the-browser.
import React from "react";

import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Trainer from "../components/trainer";
import escapeSpace from "../libs/escapeSpace";

test("The next key is highlighted", () => {
    render(<Trainer typingTexts={["ab1"]} />);

    expectKeyIsHighlighted("KeyA");
});

describe("On typing the correct key", () => {
    describe("The next key is a lowercase alphabet", () => {
        test("Shifts the text to type by a character", () => {
            expectDisplayAfterTyping("a", "b1");
        });

        test("The next key is highlighted.", () => {
            render(<Trainer typingTexts={["ab1"]} />);

            userEvent.keyboard("a");

            expectKeyIsHighlighted("KeyN");
        });
    });

    describe("Typing the last character", () => {
        // Since there is only one sentence that can be selected as the next
        // one, the same sentence is returned. In reality, the next sentence is
        // chosen randomly.
        //
        // It is difficult to add a test that ensures the next sentence is
        // chosen randomly. Modifying the list of sentences for tests may cause
        // the test to fail, and it is impractical not to make such
        // modifications.
        test("The next sentence is showed", () => {
            expectDisplayAfterTyping("ab1", "ab1");
        });
    });
});

test("Shift keys are highlighted if the next key is a number", () => {
    render(<Trainer typingTexts={["ab1"]} />);

    userEvent.keyboard("ab");

    // For some reasons, `"("` instead of `/\(/` does not work.
    const nextKey = screen.getByText(/\(/);

    expect(nextKey.parentElement?.classList).toContain("next");

    expectKeyIsHighlighted("ShiftLeft");
    expectKeyIsHighlighted("ShiftRight");
});

describe("On typing the wrong key", () => {
    test("It does not shift the text", () => {
        expectDisplayAfterTyping("b", "ab1");
    });

    test("The next key is highlighted.", () => {
        render(<Trainer typingTexts={["ab1"]} />);

        userEvent.keyboard("b");

        expectKeyIsHighlighted("KeyA");
    });
});

// There are problems with the use of key codes The keycodes are based on the
// QWERTY layout, and most of the keycodes do not match the actual keys in the
// Dvorak layout (e.g., the keycode for the "B" key is `KeyN`).
//
// However, `getByText` cannot be used because the text of the key label is too
// short, causing other parts to be subject to `getByText`, or in case of a key
// with a two-rows display, the key cannot be selected correctly because it
// contains a `<br />`. On the other hand, key codes are unique, and therefore,
// keys can be selected correctly. Therefore, we use key codes instead of key
// labels.
function expectKeyIsHighlighted(code: string): void {
    const key = screen.getByTestId(code);

    expect(key.classList).toContain("next");
}

function expectDisplayAfterTyping(textToType: string, expected: string): void {
    render(<Trainer typingTexts={["ab1"]} />);

    // The first "i" is intentionally omitted. This is because the "i" is
    // enclosed in `<span>`, and therefore `getByText` will fail if it is
    // included.
    // https://stackoverflow.com/questions/55509875/how-to-query-by-text-string-which-contains-html-tags-using-react-testing-library
    // describes how to deal with such cases. However, I decided to simply omit
    // the first "i" because, to be honest, it's a bit of a pain.
    const text = screen.getByText("b1");

    // See https://testing-library.com/docs/user-event/keyboard/ for why we need this.
    const escapedTextToType = textToType
        .replace(/\{/, "{{")
        .replace(/\[/, "[[");

    userEvent.keyboard(escapedTextToType);

    expect(text.textContent).toBe(escapeSpace(expected));
}
