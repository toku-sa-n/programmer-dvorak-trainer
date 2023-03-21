import { useEffect } from "react";

import { enableMapSet } from "immer";
import { useImmer } from "use-immer";

import styles from "./keyboard.module.css";

// The license for this class is at `/licenses/YYTypeScript`.
class ExhaustiveError extends Error {
    constructor(value: never, message = `Unsupported type: ${value}`) {
        super(message);
    }
}

type Key = SingleRowKey | DoubleRowsKey | SpecialKey;

type SingleRowKey = {
    readonly type: "SingleRowKey";
    readonly char: string;
    readonly code: string;
    pressed?: boolean;
    nextKey?: string;
};

type DoubleRowsKey = {
    readonly type: "DoubleRowsKey";
    readonly upper: string;
    readonly lower: string;
    readonly code: string;
    pressed?: boolean;
    nextKey?: string;
};

type SpecialKey = {
    readonly type: "SpecialKey";
    readonly name: SpecialKeyName;
    readonly code: string;
    pressed?: boolean;
    nextKey?: string;
};

type SpecialKeyName =
    | "backslash"
    | "capslock"
    | "command"
    | "delete"
    | "leftctrl"
    | "leftshift"
    | "return"
    | "rightshift"
    | "space"
    | "tab";

const keys: Array<Key> = [
    { type: "DoubleRowsKey", upper: "~", lower: "$", code: "Backquote" },
    { type: "DoubleRowsKey", upper: "%", lower: "&", code: "Digit1" },
    { type: "DoubleRowsKey", upper: "7", lower: "[", code: "Digit2" },
    { type: "DoubleRowsKey", upper: "5", lower: "{", code: "Digit3" },
    { type: "DoubleRowsKey", upper: "3", lower: "}", code: "Digit4" },
    { type: "DoubleRowsKey", upper: "1", lower: "(", code: "Digit5" },
    { type: "DoubleRowsKey", upper: "9", lower: "=", code: "Digit6" },
    { type: "DoubleRowsKey", upper: "0", lower: "*", code: "Digit7" },
    { type: "DoubleRowsKey", upper: "2", lower: ")", code: "Digit8" },
    { type: "DoubleRowsKey", upper: "4", lower: "+", code: "Digit9" },
    { type: "DoubleRowsKey", upper: "6", lower: "]", code: "Digit0" },
    { type: "DoubleRowsKey", upper: "8", lower: "!", code: "Minus" },
    { type: "DoubleRowsKey", upper: "`", lower: "#", code: "Equal" },
    { type: "SpecialKey", name: "delete", code: "Backspace" },
    { type: "SpecialKey", name: "tab", code: "Tab" },
    { type: "DoubleRowsKey", upper: ":", lower: ";", code: "KeyQ" },
    { type: "DoubleRowsKey", upper: "<", lower: ",", code: "KeyW" },
    { type: "DoubleRowsKey", upper: ">", lower: ".", code: "KeyE" },
    { type: "SingleRowKey", char: "P", code: "KeyR" },
    { type: "SingleRowKey", char: "Y", code: "KeyT" },
    { type: "SingleRowKey", char: "F", code: "KeyY" },
    { type: "SingleRowKey", char: "G", code: "KeyU" },
    { type: "SingleRowKey", char: "C", code: "KeyI" },
    { type: "SingleRowKey", char: "R", code: "KeyO" },
    { type: "SingleRowKey", char: "L", code: "KeyP" },
    { type: "DoubleRowsKey", upper: "?", lower: "/", code: "BracketLeft" },
    { type: "DoubleRowsKey", upper: "^", lower: "@", code: "BracketRight" },
    { type: "SpecialKey", name: "backslash", code: "Backslash" },
    { type: "SpecialKey", name: "capslock", code: "CapsLock" },
    { type: "SingleRowKey", char: "A", code: "KeyA" },
    { type: "SingleRowKey", char: "O", code: "KeyS" },
    { type: "SingleRowKey", char: "E", code: "KeyD" },
    { type: "SingleRowKey", char: "U", code: "KeyF" },
    { type: "SingleRowKey", char: "I", code: "KeyG" },
    { type: "SingleRowKey", char: "D", code: "KeyH" },
    { type: "SingleRowKey", char: "H", code: "KeyJ" },
    { type: "SingleRowKey", char: "T", code: "KeyK" },
    { type: "SingleRowKey", char: "N", code: "KeyL" },
    { type: "SingleRowKey", char: "S", code: "Semicolon" },
    { type: "DoubleRowsKey", upper: "_", lower: "-", code: "Quote" },
    { type: "SpecialKey", name: "return", code: "Enter" },
    { type: "SpecialKey", name: "leftshift", code: "ShiftLeft" },
    { type: "DoubleRowsKey", upper: '"', lower: "'", code: "KeyZ" },
    { type: "SingleRowKey", char: "Q", code: "KeyX" },
    { type: "SingleRowKey", char: "J", code: "KeyC" },
    { type: "SingleRowKey", char: "K", code: "KeyV" },
    { type: "SingleRowKey", char: "X", code: "KeyB" },
    { type: "SingleRowKey", char: "B", code: "KeyN" },
    { type: "SingleRowKey", char: "M", code: "KeyM" },
    { type: "SingleRowKey", char: "W", code: "Comma" },
    { type: "SingleRowKey", char: "V", code: "Period" },
    { type: "SingleRowKey", char: "Z", code: "Slash" },
    { type: "SpecialKey", name: "rightshift", code: "ShiftRight" },
    { type: "SpecialKey", name: "leftctrl", code: "ControlLeft" },
    { type: "SingleRowKey", char: "Alt", code: "AltLeft" },
    { type: "SpecialKey", name: "command", code: "OSLeft" },
    { type: "SpecialKey", name: "space", code: "Space" },
    { type: "SpecialKey", name: "command", code: "OSRight" },
    { type: "SingleRowKey", char: "Alt", code: "AltRight" },
    { type: "SingleRowKey", char: "Ctrl", code: "ControlRight" },
    { type: "SingleRowKey", char: "Fn", code: "asdpogasdpguh" }, // TODO: No code is assigned to the "Fn" key. Is just a empty string ok?
];

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function Keyboard({ next }: { next: string }) {
    // TODO: Is it okay to call this here?
    enableMapSet();

    const [pressedKeys, setPressedKeys] = useImmer(new Set());

    // TODO: Is it really needed to use `useEffect`?
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            setPressedKeys((keys) => keys.add(e.code));
        };

        const onKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();

            setPressedKeys((keys) => {
                keys.delete(e.code);
                return keys;
            });
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        };
    }, [pressedKeys, setPressedKeys]);

    const keyComponents = keys.map((x, i) => {
        x.pressed = pressedKeys.has(x.code);
        x.nextKey = next;

        switch (x.type) {
            case "SingleRowKey":
                return <SingleRowKey key={x.code} {...x} />;
            case "DoubleRowsKey":
                return <DoubleRowsKey key={x.code} {...x} />;
            case "SpecialKey":
                return <SpecialKey key={x.code} {...x} />;
            default:
                throw new ExhaustiveError(x);
        }
    });

    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>{keyComponents}</div>
        </div>
    );
}

function SingleRowKey({ char, pressed, nextKey }: SingleRowKey) {
    const classes = [styles.key];

    if (pressed) {
        classes.push(styles.typed);
    }
    if (char.toUpperCase() === nextKey?.toUpperCase()) {
        classes.push(styles.next);
    }

    return <div className={classes.join(" ")}>{char}</div>;
}

function DoubleRowsKey({ upper, lower, pressed, nextKey }: DoubleRowsKey) {
    const classes = [styles.key, styles["double-rows"]];

    if (pressed) {
        classes.push(styles.typed);
    }

    if (
        nextKey &&
        [upper.toUpperCase(), lower.toUpperCase()].includes(
            nextKey.toUpperCase()
        )
    ) {
        classes.push(styles.next);
    }

    return (
        <div className={classes.join(" ")}>
            {upper}
            <br />
            {lower}
        </div>
    );
}

function SpecialKey({ name, pressed, nextKey }: SpecialKey) {
    let text;
    let css;

    switch (name) {
        case "backslash": {
            const classes = [
                styles.key,
                styles.backslash,
                styles["double-rows"],
            ];

            if (pressed) {
                classes.push(styles.typed);
            }

            return (
                <div className={classes.join(" ")}>
                    |
                    <br />\
                </div>
            );
        }
        case "capslock":
            text = "CapsLock";
            css = styles.capslock;
            break;
        case "command":
            text = "Command";
            css = styles.command;
            break;
        case "delete":
            text = "Delete";
            css = styles.delete;
            break;
        case "leftctrl":
            text = "Ctrl";
            css = styles.leftctrl;
            break;
        case "leftshift": {
            text = "Shift";
            css = styles.leftshift;

            const isUpper =
                keys.find(
                    (x) => x.type === "DoubleRowsKey" && x.upper === nextKey
                ) !== undefined;

            if (
                isUpper ||
                (nextKey &&
                    (isNumeric(nextKey) ||
                        (isAlphabet(nextKey) &&
                            nextKey === nextKey.toUpperCase())))
            ) {
                css += " " + styles.next;
            }
            break;
        }
        case "return":
            text = "Return";
            css = styles.return;
            break;
        case "rightshift":
            text = "Shift";
            css = styles.rightshift;

            const isUpper =
                keys.find(
                    (x) => x.type === "DoubleRowsKey" && x.upper === nextKey
                ) !== undefined;

            if (
                isUpper ||
                (nextKey &&
                    (isNumeric(nextKey) ||
                        (isAlphabet(nextKey) &&
                            nextKey === nextKey.toUpperCase())))
            ) {
                css += " " + styles.next;
            }
            break;
        case "space":
            text = "Space";
            css = styles.space;

            if (nextKey === " ") {
                css += " " + styles.next;
            }
            break;
        case "tab":
            text = "Tab";
            css = styles.tab;
            break;
        default:
            throw new ExhaustiveError(name);
            break;
    }

    const classes = [styles.key, css];

    if (pressed) {
        classes.push(styles.typed);
    }

    return <div className={classes.join(" ")}>{text}</div>;
}

function isNumeric(c: string): boolean {
    const code = c.charCodeAt(0);

    return code > 47 && code < 58;
}

function isAlphabet(c: string): boolean {
    const code = c.charCodeAt(0);

    return (code > 64 && code < 91) || (code > 96 && code < 123);
}
