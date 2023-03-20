import { useEffect, useState } from "react";
import Display from "./display";
import Keyboard from "./keyboard";

const original = [
    'int main(void){printf("hello world");return 0;}',
    "e=2.7182818284",
    "pi=3.1415926535",
    "int euclid(int a,int b){if(a==1){return b;}else{return euclid(b,a%b);}",
    "function choice(){return original[Math.floor(Math.random()*original.length)];}",
    "main::IO()",
    "sudo rm -rf --no-preserve-root",
    "man ls",
];

function choice() {
    return original[Math.floor(Math.random() * original.length)];
}

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
                } else {
                    return text.slice(1);
                }
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
