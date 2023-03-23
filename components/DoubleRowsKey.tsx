import styles from "./keyboard.module.css";

type DoubleRowsKeyProps = {
    readonly upper: string;
    readonly lower: string;
    readonly pressed: boolean;
    readonly nextKey: string;
};

export default function DoubleRowsKey({
    upper,
    lower,
    pressed,
    nextKey,
}: DoubleRowsKeyProps) {
    const classes = [styles.key, styles["double-rows"]];

    if (pressed) {
        classes.push(styles.typed);
    }

    if (nextKey && isNextKey(nextKey, upper, lower)) {
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

function isNextKey(key: string, upper: string, lower: string): boolean {
    return [upper.toUpperCase(), lower.toUpperCase()].includes(
        key.toUpperCase()
    );
}
