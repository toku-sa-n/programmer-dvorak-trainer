import ExhaustiveError from "../libs/ExhausitiveError";
import SpecialKeyName from "../libs/SpecialKeyName";
import styles from "./keyboard.module.css";

type SpecialKeyProps = {
    readonly name: SpecialKeyName;
    readonly isNextKey: boolean;
    readonly pressed: boolean;
};

export default function SpecialKey({
    name,
    isNextKey,
    pressed,
}: SpecialKeyProps) {
    let text;
    let css;

    switch (name) {
        case "backslash": {
            const classes = [styles.key, styles.backslash];

            if (pressed) {
                classes.push(styles.typed);
            }

            return (
                <div className={classes.join(" ")}>
                    <div className={styles["key-label"]}>
                        |
                        <br />\
                    </div>
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

            if (isNextKey) {
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

            if (isNextKey) {
                css += ` ${styles.next}`;
            }
            break;
        case "space":
            text = "Space";
            css = styles.space;

            if (isNextKey) {
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

    return (
        <div className={classes.join(" ")}>
            <div className={styles["key-label"]}>{text}</div>
        </div>
    );
}
