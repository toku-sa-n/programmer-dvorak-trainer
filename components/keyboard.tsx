import { useEffect } from "react";

import { enableMapSet } from "immer";
import { useImmer } from "use-immer";

import ExhaustiveError from "../libs/ExhausitiveError";
import keys from "../libs/keys";
import DoubleRowsKey from "./DoubleRowsKey";
import SingleRowKey from "./SingleRowKey";
import SpecialKey from "./SpecialKey";
import styles from "./keyboard.module.css";

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
