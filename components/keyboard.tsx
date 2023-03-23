import { useEffect } from "react";

import { enableMapSet } from "immer";
import { useImmer } from "use-immer";

import ExhaustiveError from "../libs/ExhausitiveError";
import KeyDefinition from "../libs/KeyDefinition";
import styles from "./keyboard.module.css";

type SingleRowKeyProps = {
    readonly char: string;
    readonly pressed: boolean;
    readonly nextKey: string;
    readonly isHomePosition: boolean;
};

type DoubleRowsKeyProps = {
    readonly upper: string;
    readonly lower: string;
    readonly pressed: boolean;
    readonly nextKey: string;
};

type SpecialKeyProps = {
    readonly name: SpecialKeyName;
    readonly pressed: boolean;
    readonly nextKey: string;
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

const keys: ReadonlyArray<KeyDefinition> = [
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
    { type: "SingleRowKey", char: "P", code: "KeyR", isHomePosition: false },
    { type: "SingleRowKey", char: "Y", code: "KeyT", isHomePosition: false },
    { type: "SingleRowKey", char: "F", code: "KeyY", isHomePosition: false },
    { type: "SingleRowKey", char: "G", code: "KeyU", isHomePosition: false },
    { type: "SingleRowKey", char: "C", code: "KeyI", isHomePosition: false },
    { type: "SingleRowKey", char: "R", code: "KeyO", isHomePosition: false },
    { type: "SingleRowKey", char: "L", code: "KeyP", isHomePosition: false },
    { type: "DoubleRowsKey", upper: "?", lower: "/", code: "BracketLeft" },
    { type: "DoubleRowsKey", upper: "^", lower: "@", code: "BracketRight" },
    { type: "SpecialKey", name: "backslash", code: "Backslash" },
    { type: "SpecialKey", name: "capslock", code: "CapsLock" },
    { type: "SingleRowKey", char: "A", code: "KeyA", isHomePosition: false },
    { type: "SingleRowKey", char: "O", code: "KeyS", isHomePosition: false },
    { type: "SingleRowKey", char: "E", code: "KeyD", isHomePosition: false },
    { type: "SingleRowKey", char: "U", code: "KeyF", isHomePosition: true },
    { type: "SingleRowKey", char: "I", code: "KeyG", isHomePosition: false },
    { type: "SingleRowKey", char: "D", code: "KeyH", isHomePosition: false },
    { type: "SingleRowKey", char: "H", code: "KeyJ", isHomePosition: true },
    { type: "SingleRowKey", char: "T", code: "KeyK", isHomePosition: false },
    { type: "SingleRowKey", char: "N", code: "KeyL", isHomePosition: false },
    {
        type: "SingleRowKey",
        char: "S",
        code: "Semicolon",
        isHomePosition: false,
    },
    { type: "DoubleRowsKey", upper: "_", lower: "-", code: "Quote" },
    { type: "SpecialKey", name: "return", code: "Enter" },
    { type: "SpecialKey", name: "leftshift", code: "ShiftLeft" },
    { type: "DoubleRowsKey", upper: '"', lower: "'", code: "KeyZ" },
    { type: "SingleRowKey", char: "Q", code: "KeyX", isHomePosition: false },
    { type: "SingleRowKey", char: "J", code: "KeyC", isHomePosition: false },
    { type: "SingleRowKey", char: "K", code: "KeyV", isHomePosition: false },
    { type: "SingleRowKey", char: "X", code: "KeyB", isHomePosition: false },
    { type: "SingleRowKey", char: "B", code: "KeyN", isHomePosition: false },
    { type: "SingleRowKey", char: "M", code: "KeyM", isHomePosition: false },
    { type: "SingleRowKey", char: "W", code: "Comma", isHomePosition: false },
    { type: "SingleRowKey", char: "V", code: "Period", isHomePosition: false },
    { type: "SingleRowKey", char: "Z", code: "Slash", isHomePosition: false },
    { type: "SpecialKey", name: "rightshift", code: "ShiftRight" },
    { type: "SpecialKey", name: "leftctrl", code: "ControlLeft" },
    {
        type: "SingleRowKey",
        char: "Alt",
        code: "AltLeft",
        isHomePosition: false,
    },
    { type: "SpecialKey", name: "command", code: "OSLeft" },
    { type: "SpecialKey", name: "space", code: "Space" },
    { type: "SpecialKey", name: "command", code: "OSRight" },
    {
        type: "SingleRowKey",
        char: "Alt",
        code: "AltRight",
        isHomePosition: false,
    },
    {
        type: "SingleRowKey",
        char: "Ctrl",
        code: "ControlRight",
        isHomePosition: false,
    },
    {
        type: "SingleRowKey",
        char: "Fn",
        code: null,
        isHomePosition: false,
    },
] as const;

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function Keyboard({ next }: { next: string }) {
    // TODO: Is it okay to call this here?
    enableMapSet();

    const [pressedKeys, setPressedKeys] = useImmer(new Set());

    // TODO: Is it really needed to use `useEffect`?
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            setPressedKeys((presed) => presed.add(e.code));
        };

        const onKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();

            setPressedKeys((pressed) => {
                pressed.delete(e.code);
                return pressed;
            });
        };

        document.addEventListener("keydown", onKeyDown);
        document.addEventListener("keyup", onKeyUp);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
            document.removeEventListener("keyup", onKeyUp);
        };
    }, [pressedKeys, setPressedKeys]);

    const keyComponents = keys.map((x) => {
        switch (x.type) {
            case "SingleRowKey":
                return (
                    <SingleRowKey
                        key={x.code}
                        pressed={pressedKeys.has(x.code)}
                        nextKey={next}
                        char={x.char}
                        isHomePosition={x.isHomePosition}
                    />
                );
            case "DoubleRowsKey":
                return (
                    <DoubleRowsKey
                        key={x.code}
                        upper={x.upper}
                        lower={x.lower}
                        pressed={pressedKeys.has(x.code)}
                        nextKey={next}
                    />
                );
            case "SpecialKey":
                return (
                    <SpecialKey
                        key={x.code}
                        name={x.name}
                        pressed={pressedKeys.has(x.code)}
                        nextKey={next}
                    />
                );
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

function SingleRowKey({
    char,
    pressed,
    nextKey,
    isHomePosition,
}: SingleRowKeyProps) {
    const classes = [styles.key];

    if (pressed) {
        classes.push(styles.typed);
    }

    if (char.toUpperCase() === nextKey?.toUpperCase()) {
        classes.push(styles.next);
    }

    if (isHomePosition) {
        classes.push(styles["home-position"]);
    }

    return <div className={classes.join(" ")}>{char}</div>;
}

function DoubleRowsKey({ upper, lower, pressed, nextKey }: DoubleRowsKeyProps) {
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

function SpecialKey({ name, pressed, nextKey }: SpecialKeyProps) {
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

            if (nextKey && shiftKeyIsNeeded(nextKey)) {
                css += ` ${styles.next}`;
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

            if (nextKey && shiftKeyIsNeeded(nextKey)) {
                css += ` ${styles.next}`;
            }
            break;
        case "space":
            text = "Space";
            css = styles.space;

            if (nextKey === " ") {
                css += ` ${styles.next}`;
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

function isAlphabet(c: string): boolean {
    const code = c.charCodeAt(0);

    return (code > 64 && code < 91) || (code > 96 && code < 123);
}

function shiftKeyIsNeeded(c: string): boolean {
    if (c.length !== 1) {
        throw new Error(`Only a character should be passed but 'c' is ${c}.`);
    }

    const isUpperKey =
        keys.find((x) => x.type === "DoubleRowsKey" && x.upper === c) !==
        undefined;

    const isUpperCase = isAlphabet(c) && c === c.toUpperCase();

    return isUpperKey || isUpperCase;
}
