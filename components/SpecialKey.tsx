import keys from "../libs/keys";
import styles from "./keyboard.module.css";

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

type SpecialKeyProps = {
    readonly name: SpecialKeyName;
    readonly pressed: boolean;
    readonly nextKey: string;
};

export default function SpecialKey({
    name,
    pressed,
    nextKey,
}: SpecialKeyProps) {
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
