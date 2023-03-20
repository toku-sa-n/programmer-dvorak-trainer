import { useEffect, useState } from "react";
import Display from "./display";
import Keyboard from "./keyboard";

const original = [
    'int main(void){printf("hello world");return 0;}',
    "e=2.718281828459045235360287471352662497757247093699959574966967627724076630353",
    "pi=3.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679",
    "int euclid(int a,int b){if(a==1){return b;}else{return euclid(b,a%b);}",
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
