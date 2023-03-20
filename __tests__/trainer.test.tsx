// `userEvent.keyboard` does not work on console with `user-event` 14.*.
// See https://stackoverflow.com/questions/72273734/test-with-userevent-keyboard-does-not-pass-however-it-works-in-the-browser.
import React from "react";

import { expect } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { mockRandomForEach } from "jest-mock-random";

import Trainer from "../components/trainer";

mockRandomForEach([0.1]);

test("The next key is highlighted", () => {
  render(<Trainer />);

  const key = screen.getByText("I");

  expect(key.classList).toContain("next");
});

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

test("Typing the wrong key does not shift the text", () => {
  render(<Trainer />);

  const text = screen.getByText(
    'int main(void){printf("hello world");return 0;}'
  );

  userEvent.keyboard("a");

  expect(text.textContent).toBe(
    'int main(void){printf("hello world");return 0;}'.replace(/ /g, "\u00A0")
  );
});
