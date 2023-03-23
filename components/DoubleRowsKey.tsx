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
