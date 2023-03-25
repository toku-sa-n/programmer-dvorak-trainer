import { useEffect, useState } from "react";

import Display from "./display";
import Keyboard from "./keyboard";

type TrainerProps = {
    typingTexts: string[];
};

// Different lists can be passed during normal execution and testing, which
// makes testing easier.
export default function Trainer({ typingTexts }: TrainerProps) {
    const [currentText, setCurrentText] = useState("");

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== currentText[0]) {
                return;
            }

            setCurrentText((text) => {
                if (text.length <= 1) {
                    return choice(typingTexts);
                }

                return text.slice(1);
            });
        }

        document.addEventListener("keydown", onKeyDown);

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [currentText, typingTexts]);

    // `useEffect` is used to avoid a warning. See
    // https://stackoverflow.com/questions/47539922/next-js-react-warning-when-generating-random-values-in-a-component.
    useEffect(() => {
        setCurrentText(choice(typingTexts));
    }, [typingTexts]);

    return (
        <>
            <Display text={currentText} />
            <Keyboard next={currentText[0]} />
        </>
    );
}

function choice<T>(l: T[]): T {
    return l[Math.floor(Math.random() * l.length)];
}
