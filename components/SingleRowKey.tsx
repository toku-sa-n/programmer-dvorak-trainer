import styles from "./keyboard.module.css";

type SingleRowKeyProps = {
    readonly code: string | null;
    readonly char: string;
    // A workaround for false-positive.
    // eslint-disable-next-line react/no-unused-prop-types
    readonly pressed: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    readonly isNextKey: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    readonly isHomePosition: boolean;
};

export default function SingleRowKey(props: SingleRowKeyProps) {
    const { char, code } = props;

    return (
        <div data-testid={code} className={classes(props)}>
            <div className={styles["key-label"]}>{char}</div>
        </div>
    );
}

function classes({
    pressed,
    isNextKey,
    isHomePosition,
}: SingleRowKeyProps): string {
    const l = [styles.key];

    if (pressed) {
        l.push(styles.typed);
    }

    if (isNextKey) {
        l.push(styles.next);
    }

    if (isHomePosition) {
        l.push(styles["home-position"]);
    }

    return l.join(" ");
}
