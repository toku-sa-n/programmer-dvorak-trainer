import { useEffect, useState } from "react";

import typingTexts from "../libs/typingTexts";
import Display from "./display";
import Keyboard from "./keyboard";

export default function Trainer() {
    const [text, setText] = useState("");

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== text[0]) {
                return;
            }

            setText((text) => {
                if (text.length === 1) {
                    return choice();
                }

                return text.slice(1);
            });
        }

        document.addEventListener("keydown", onKeyDown);

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [text]);

    // `useEffect` is used to avoid a warning.
    // See https://stackoverflow.com/questions/47539922/next-js-react-warning-when-generating-random-values-in-a-component.
    useEffect(() => {
        setText(choice());
    }, []);

    return (
        <>
            <Display text={text} />
            <Keyboard next={text[0]} />
        </>
    );
}

function choice() {
    return typingTexts[Math.floor(Math.random() * typingTexts.length)];
}
