import { useEffect, useState } from "react";

import Display from "./display";
import Keyboard from "./keyboard";

type TrainerProps = {
    typingTexts: string[];
};

export default function Trainer({ typingTexts }: TrainerProps) {
    const [text, setText] = useState("");

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== text[0]) {
                return;
            }

            setText((text) => {
                if (text.length === 1) {
                    return choice(typingTexts);
                }

                return text.slice(1);
            });
        }

        document.addEventListener("keydown", onKeyDown);

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [text, typingTexts]);

    // `useEffect` is used to avoid a warning.
    // See https://stackoverflow.com/questions/47539922/next-js-react-warning-when-generating-random-values-in-a-component.
    useEffect(() => {
        setText(choice(typingTexts));
    }, [typingTexts]);

    return (
        <>
            <Display text={text} />
            <Keyboard next={text[0]} />
        </>
    );
}

function choice<T>(l: T[]): T {
    return l[Math.floor(Math.random() * l.length)];
}
