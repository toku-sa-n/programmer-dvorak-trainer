import ExhaustiveError from "../libs/ExhausitiveError";
import SpecialKeyName from "../libs/SpecialKeyName";
import styles from "./keyboard.module.css";

type SpecialKeyProps = {
    readonly code: string;
    // A workaround for false-positive.
    // eslint-disable-next-line react/no-unused-prop-types
    readonly name: SpecialKeyName;
    // eslint-disable-next-line react/no-unused-prop-types
    readonly isNextKey: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    readonly pressed: boolean;
};

export default function SpecialKey(props: SpecialKeyProps) {
    const { code } = props;

    return (
        <div data-testid={code} className={classes(props).join(" ")}>
            <div className={styles["key-label"]}>{label(props)}</div>
        </div>
    );
}

function classes(props: SpecialKeyProps): string[] {
    const { pressed, isNextKey } = props;

    const l = [styles.key, additionalStyles(props)];

    if (pressed) {
        l.push(styles.typed);
    }

    if (isNextKey) {
        l.push(styles.next);
    }

    return l;
}

function label({ name }: SpecialKeyProps) {
    switch (name) {
        case "backslash":
            return (
                <>
                    |
                    <br />\
                </>
            );
        case "capslock":
            return "CapsLock";
        case "command":
            return "Command";
        case "delete":
            return "Delete";
        case "leftctrl":
            return "Ctrl";
        case "leftshift":
        case "rightshift":
            return "Shift";
        case "return":
            return "Return";
        case "space":
            return "Space";
        case "tab":
            return "Tab";
        default:
            throw new ExhaustiveError(name);
    }
}

function additionalStyles({ name }: SpecialKeyProps) {
    switch (name) {
        case "backslash":
            return styles.backslash;
        case "capslock":
            return styles.capslock;
        case "command":
            return styles.command;
        case "delete":
            return styles.delete;
        case "leftctrl":
            return styles.leftctrl;
        case "leftshift":
            return styles.leftshift;
        case "return":
            return styles.return;
        case "rightshift":
            return styles.rightshift;
        case "space":
            return styles.space;
        case "tab":
            return styles.tab;
        default:
            throw new ExhaustiveError(name);
    }
}
