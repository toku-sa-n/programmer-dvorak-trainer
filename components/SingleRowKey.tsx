import styles from "./keyboard.module.css";

type SingleRowKeyProps = {
    readonly char: string;
    readonly pressed: boolean;
    readonly nextKey: string;
    readonly isHomePosition: boolean;
};

export default function SingleRowKey({
    char,
    pressed,
    nextKey,
    isHomePosition,
}: SingleRowKeyProps) {
    const classes = [styles.key];

    if (pressed) {
        classes.push(styles.typed);
    }

    if (nextKey && isNextKey(char, nextKey)) {
        classes.push(styles.next);
    }

    if (isHomePosition) {
        classes.push(styles["home-position"]);
    }

    return <div className={classes.join(" ")}>{char}</div>;
}

function isNextKey(key: string, nextKey: string): boolean {
    return key.toUpperCase() === nextKey.toUpperCase();
}
