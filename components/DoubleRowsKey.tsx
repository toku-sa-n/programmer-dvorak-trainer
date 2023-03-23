import styles from "./keyboard.module.css";

type DoubleRowsKeyProps = {
    readonly upper: string;
    readonly lower: string;
    readonly isNextKey: boolean;
    readonly pressed: boolean;
};

export default function DoubleRowsKey({
    upper,
    lower,
    isNextKey,
    pressed,
}: DoubleRowsKeyProps) {
    const classes = [styles.key];

    if (pressed) {
        classes.push(styles.typed);
    }

    if (isNextKey) {
        classes.push(styles.next);
    }

    return (
        <div className={classes.join(" ")}>
            <div className={styles["key-label"]}>
                {upper}
                <br />
                {lower}
            </div>
        </div>
    );
}
