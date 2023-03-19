import { useEffect, useState } from "react";
import Display from "./display";
import Keyboard from "./keyboard";

const original = "e=2.7";

export default function Trainer() {
    const [text, setText] = useState(original);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== text[0]) {
                return;
            }

            setText((text) => {
                if (text.length === 1) {
                    return original;
                } else {
                    return text.slice(1);
                }
            });
        }

        document.addEventListener("keydown", onKeyDown);

        return () => document.removeEventListener("keydown", onKeyDown);
    }, [text]);

    return (
        <>
            <Display text={text} />
            <Keyboard />
        </>
    );
}
