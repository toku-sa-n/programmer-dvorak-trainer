import { useEffect, useState } from "react";
import styles from "./keyboard.module.css";

// The license for this class is at `/licenses/YYTypeScript`.
class ExhaustiveError extends Error {
    constructor(value: never, message = `Unsupported type: ${value}`) {
        super(message);
    }
}

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function Keyboard() {
    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>
                <DoubleRowsKey upper="~" lower="$" />
                <DoubleRowsKey upper="%" lower="&" />
                <DoubleRowsKey upper="7" lower="[" />
                <DoubleRowsKey upper="5" lower="&#123;" />
                <DoubleRowsKey upper="3" lower="&#125;" />
                <DoubleRowsKey upper="1" lower="(" />
                <DoubleRowsKey upper="9" lower="=" />
                <DoubleRowsKey upper="0" lower="*" />
                <DoubleRowsKey upper="2" lower=")" />
                <DoubleRowsKey upper="4" lower="+" />
                <DoubleRowsKey upper="6" lower="]" />
                <DoubleRowsKey upper="8" lower="!" />
                <DoubleRowsKey upper="`" lower="#" />
                <SpecialKey type="delete" />
                <SpecialKey type="tab" />
                <DoubleRowsKey upper=":" lower=";" />
                <DoubleRowsKey upper="&lt;" lower="," />
                <DoubleRowsKey upper="&gt;" lower="." />
                <SingleRowKey char="P" />
                <SingleRowKey char="Y" />
                <SingleRowKey char="F" />
                <SingleRowKey char="G" />
                <SingleRowKey char="C" />
                <SingleRowKey char="R" />
                <SingleRowKey char="L" />
                <DoubleRowsKey upper="?" lower="/" />
                <DoubleRowsKey upper="^" lower="@" />
                <SpecialKey type="backslash" />
                <SpecialKey type="capslock" />
                <SingleRowKey char="A" />
                <SingleRowKey char="O" />
                <SingleRowKey char="E" />
                <SingleRowKey char="U" />
                <SingleRowKey char="I" />
                <SingleRowKey char="D" />
                <SingleRowKey char="H" />
                <SingleRowKey char="T" />
                <SingleRowKey char="N" />
                <SingleRowKey char="S" />
                <DoubleRowsKey upper="_" lower="-" />
                <SpecialKey type="return" />
                <SpecialKey type="leftshift" />
                <DoubleRowsKey upper="&#34;" lower="&#39;" />
                <SingleRowKey char="Q" />
                <SingleRowKey char="J" />
                <SingleRowKey char="K" />
                <SingleRowKey char="X" />
                <SingleRowKey char="B" />
                <SingleRowKey char="M" />
                <SingleRowKey char="W" />
                <SingleRowKey char="V" />
                <SingleRowKey char="Z" />
                <SpecialKey type="rightshift" />
                <SpecialKey type="leftctrl" />
                <SingleRowKey char="Alt" />
                <SpecialKey type="command" />
                <SpecialKey type="space" />
                <SpecialKey type="command" />
                <SingleRowKey char="Alt" />
                <SingleRowKey char="Ctrl" />
                <SingleRowKey char="Fn" />
            </div>
        </div>
    );
}

type SpecialKey =
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

function SingleRowKey({ char }: { char: string }) {
    const [isKeyDown, setIsKeyDown] = useState(false);

    function onKeyDown(e: Event) {
        setIsKeyDown(true);
        e.preventDefault();
    }

    function onKeyUp(e: Event) {
        setIsKeyDown(false);
        e.preventDefault();
    }

    useEffect(() => {
        globalThis.addEventListener("keydown", onKeyDown);
        globalThis.addEventListener("keyup", onKeyUp);

        return () => {
            globalThis.removeEventListener("keydown", onKeyDown);
            globalThis.removeEventListener("keyup", onKeyUp);
        };
    });

    let css = styles.key + (isKeyDown ? " " + styles.typed : "");

    return <div className={css}>{char}</div>;
}

function DoubleRowsKey({ upper, lower }: { upper: string; lower: string }) {
    return (
        <div className={`${styles.key} ${styles["double-rows"]}`}>
            {upper}
            <br />
            {lower}
        </div>
    );
}

function SpecialKey({ type }: { type: SpecialKey }) {
    let text;
    let css;

    switch (type) {
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
            throw new ExhaustiveError(type);
            break;
    }

    return <div className={`${styles.key} ${css}`}>{text}</div>;
}
