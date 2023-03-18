import { Press_Start_2P } from "next/font/google";
import { useImmer } from "use-immer";
import { enableMapSet } from "immer";
import { useEffect, useState } from "react";
import styles from "./keyboard.module.css";

// The license for this class is at `/licenses/YYTypeScript`.
class ExhaustiveError extends Error {
    constructor(value: never, message = `Unsupported type: ${value}`) {
        super(message);
    }
}

type Key = SingleRowKey | DoubleRowsKey | SpecialKey;

type SingleRowKey = {
    type: "SingleRowKey";
    char: string;
    pressed?: boolean;
};

type DoubleRowsKey = {
    type: "DoubleRowsKey";
    upper: string;
    lower: string;
    pressed?: boolean;
};

type SpecialKey = {
    type: "SpecialKey";
    name: SpecialKeyName;
    pressed?: boolean;
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

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function Keyboard() {
    // TODO: Is it okay to call this here?
    enableMapSet();

    const [pressedKeys, setPressedKeys] = useImmer(new Set());

    const keys: Array<Key> = [
        { type: "DoubleRowsKey", upper: "~", lower: "$" },
        { type: "DoubleRowsKey", upper: "%", lower: "&" },
        { type: "DoubleRowsKey", upper: "7", lower: "[" },
        { type: "DoubleRowsKey", upper: "5", lower: "{" },
        { type: "DoubleRowsKey", upper: "3", lower: "}" },
        { type: "DoubleRowsKey", upper: "1", lower: "(" },
        { type: "DoubleRowsKey", upper: "9", lower: "=" },
        { type: "DoubleRowsKey", upper: "0", lower: "*" },
        { type: "DoubleRowsKey", upper: "2", lower: ")" },
        { type: "DoubleRowsKey", upper: "4", lower: "+" },
        { type: "DoubleRowsKey", upper: "6", lower: "]" },
        { type: "DoubleRowsKey", upper: "8", lower: "!" },
        { type: "DoubleRowsKey", upper: "`", lower: "#" },
        { type: "SpecialKey", name: "delete" },
        { type: "SpecialKey", name: "tab" },
        { type: "DoubleRowsKey", upper: ":", lower: ";" },
        { type: "DoubleRowsKey", upper: "<", lower: "," },
        { type: "DoubleRowsKey", upper: ">", lower: "." },
        { type: "SingleRowKey", char: "P" },
        { type: "SingleRowKey", char: "Y" },
        { type: "SingleRowKey", char: "F" },
        { type: "SingleRowKey", char: "G" },
        { type: "SingleRowKey", char: "C" },
        { type: "SingleRowKey", char: "R" },
        { type: "SingleRowKey", char: "L" },
        { type: "DoubleRowsKey", upper: "?", lower: "/" },
        { type: "DoubleRowsKey", upper: "^", lower: "@" },
        { type: "SpecialKey", name: "backslash" },
        { type: "SpecialKey", name: "capslock" },
        { type: "SingleRowKey", char: "A" },
        { type: "SingleRowKey", char: "O" },
        { type: "SingleRowKey", char: "E" },
        { type: "SingleRowKey", char: "U" },
        { type: "SingleRowKey", char: "I" },
        { type: "SingleRowKey", char: "D" },
        { type: "SingleRowKey", char: "H" },
        { type: "SingleRowKey", char: "T" },
        { type: "SingleRowKey", char: "N" },
        { type: "SingleRowKey", char: "S" },
        { type: "DoubleRowsKey", upper: "_", lower: "-" },
        { type: "SpecialKey", name: "return" },
        { type: "SpecialKey", name: "leftshift" },
        { type: "DoubleRowsKey", upper: '"', lower: "'" },
        { type: "SingleRowKey", char: "Q" },
        { type: "SingleRowKey", char: "J" },
        { type: "SingleRowKey", char: "K" },
        { type: "SingleRowKey", char: "X" },
        { type: "SingleRowKey", char: "B" },
        { type: "SingleRowKey", char: "M" },
        { type: "SingleRowKey", char: "W" },
        { type: "SingleRowKey", char: "V" },
        { type: "SingleRowKey", char: "Z" },
        { type: "SpecialKey", name: "rightshift" },
        { type: "SpecialKey", name: "leftctrl" },
        { type: "SingleRowKey", char: "Alt" },
        { type: "SpecialKey", name: "command" },
        { type: "SpecialKey", name: "space" },
        { type: "SpecialKey", name: "command" },
        { type: "SingleRowKey", char: "Alt" },
        { type: "SingleRowKey", char: "Ctrl" },
        { type: "SingleRowKey", char: "Fn" },
    ];

    // TODO: Is it really needed to use `useEffect`?
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            e.preventDefault();

            setPressedKeys((keys) => keys.add(e.key.toLowerCase()));
        };

        const onKeyUp = (e: KeyboardEvent) => {
            e.preventDefault();

            console.log(e.key, pressedKeys);

            setPressedKeys((keys) => {
                keys.delete(e.key.toLowerCase());
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
        switch (x.type) {
            case "SingleRowKey":
                if (pressedKeys.has(x.char.toLowerCase())) {
                    x.pressed = true;
                }
                return <SingleRowKey key={i} {...x} />;
            case "DoubleRowsKey":
                if (
                    pressedKeys.has(x.lower.toLowerCase()) ||
                    pressedKeys.has(x.upper.toLowerCase())
                ) {
                    x.pressed = true;
                }
                return <DoubleRowsKey key={i} {...x} />;
            case "SpecialKey":
                if (pressedKeys.has(x.name)) {
                    x.pressed = true;
                }
                return <SpecialKey key={i} {...x} />;
        }
    });

    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>{keyComponents}</div>
        </div>
    );
}

function SingleRowKey({ char, pressed }: SingleRowKey) {
    const classes = styles.key + (pressed ? " " + styles.typed : "");
    return <div className={classes}>{char}</div>;
}

function DoubleRowsKey({ upper, lower }: DoubleRowsKey) {
    return (
        <div className={`${styles.key} ${styles["double-rows"]}`}>
            {upper}
            <br />
            {lower}
        </div>
    );
}

function SpecialKey({ name }: SpecialKey) {
    let text;
    let css;

    switch (name) {
        case "backslash":
            return (
                <div
                    className={`${styles.key} ${styles.backslash} ${styles["double-rows"]}`}
                >
                    |
                    <br />\
                </div>
            );
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
        case "leftshift":
            text = "Shift";
            css = styles.leftshift;
            break;
        case "return":
            text = "Return";
            css = styles.return;
            break;
        case "rightshift":
            text = "Shift";
            css = styles.rightshift;
            break;
        case "space":
            text = "Space";
            css = styles.space;
            break;
        case "tab":
            text = "Tab";
            css = styles.tab;
            break;
        default:
            throw new ExhaustiveError(name);
            break;
    }

    return <div className={`${styles.key} ${css}`}>{text}</div>;
}
