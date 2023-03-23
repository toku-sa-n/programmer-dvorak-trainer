import styles from "./keyboard.module.css";

type SingleRowKeyProps = {
    readonly char: string;
    readonly pressed: boolean;
    readonly isNextKey: boolean;
    readonly isHomePosition: boolean;
};

export default function SingleRowKey({
    char,
    pressed,
    isNextKey,
    isHomePosition,
}: SingleRowKeyProps) {
    const classes = [styles.key];

    if (pressed) {
        classes.push(styles.typed);
    }

    if (isNextKey) {
        classes.push(styles.next);
    }

    if (isHomePosition) {
        classes.push(styles["home-position"]);
    }

    return <div className={classes.join(" ")}>{char}</div>;
}
