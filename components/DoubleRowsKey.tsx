import styles from "./keyboard.module.css";

type DoubleRowsKeyProps = {
    readonly code: string;
    readonly upper: string;
    readonly lower: string;
    // A workaround for false-positive.
    // eslint-disable-next-line react/no-unused-prop-types
    readonly isNextKey: boolean;
    // eslint-disable-next-line react/no-unused-prop-types
    readonly pressed: boolean;
};

export default function DoubleRowsKey(props: DoubleRowsKeyProps) {
    const { code, upper, lower } = props;

    return (
        <div data-testid={code} className={classes(props)}>
            <div className={styles["key-label"]}>
                {upper}
                <br />
                {lower}
            </div>
        </div>
    );
}

function classes(props: DoubleRowsKeyProps): string {
    const { pressed, isNextKey } = props;

    const l = [styles.key];

    if (pressed) {
        l.push(styles.typed);
    }

    if (isNextKey) {
        l.push(styles.next);
    }

    return l.join(" ");
}
