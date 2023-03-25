import { useEffect } from "react";

import { enableMapSet } from "immer";
import { useImmer } from "use-immer";

import ExhaustiveError from "../libs/ExhausitiveError";
import KeyDefinition from "../libs/KeyDefinition";
import SpecialKeyDefinition from "../libs/SpecialKeyDefinition";
import keys from "../libs/keys";
import DoubleRowsKey from "./DoubleRowsKey";
import SingleRowKey from "./SingleRowKey";
import SpecialKey from "./SpecialKey";
import styles from "./keyboard.module.css";

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
                        // `next` can be `undefined`. When the program starts
                        // and before the first `useEffect` is executed, `next
                        // === undefined` because the problem statement is
                        // empty.
                        isNextKey={next !== undefined && isNextKey(x, next)}
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
                        isNextKey={next !== undefined && isNextKey(x, next)}
                        pressed={pressedKeys.has(x.code)}
                    />
                );
            case "SpecialKey":
                return (
                    <SpecialKey
                        key={x.code}
                        name={x.name}
                        pressed={pressedKeys.has(x.code)}
                        isNextKey={next !== undefined && isNextKey(x, next)}
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

function isNextKey(key: KeyDefinition, nextKey: string): boolean {
    switch (key.type) {
        case "SingleRowKey":
            return key.char.toUpperCase() === nextKey.toUpperCase();
        case "DoubleRowsKey":
            return [key.upper.toUpperCase(), key.lower.toUpperCase()].includes(
                nextKey
            );
        case "SpecialKey":
            return isNextSpecialKey(key, nextKey);
        default:
            throw new ExhaustiveError(key);
    }
}

function isNextSpecialKey(key: SpecialKeyDefinition, nextKey: string): boolean {
    switch (key.name) {
        case "backslash":
            return nextKey === "\\";
        case "space":
            return nextKey === " ";
        case "leftshift":
        case "rightshift":
            return isShiftKeyNeeded(nextKey);
        default:
            return false;
    }
}

function isShiftKeyNeeded(c: string): boolean {
    if (c.length !== 1) {
        throw new Error(`Only a character should be passed but 'c' is ${c}.`);
    }

    const isUpperKey =
        keys.find((x) => x.type === "DoubleRowsKey" && x.upper === c) !==
        undefined;

    const isUpperCase = isAlphabet(c) && c === c.toUpperCase();

    return isUpperKey || isUpperCase;
}

function isAlphabet(c: string): boolean {
    const code = c.charCodeAt(0);

    return (code > 64 && code < 91) || (code > 96 && code < 123);
}
