import styles from "./keyboard.module.css";

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function SingleKeyboard() {
    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>
                <DoubleRowsKey upper="~" lower="$" />
                <DoubleRowsKey upper="%" lower="&" />
                <DoubleRowsKey upper="7" lower="[" />
                <DoubleRowsKey upper="5" lower="&#123;" />
                <DoubleRowsKey upper="3" lower="&#125;" />
                <DoubleRowsKey upper="1" lower="(" />
                <DoubleRowsKey upper="9" lower="=" />
                <DoubleRowsKey upper="0" lower="*" />
                <DoubleRowsKey upper="2" lower=")" />
                <DoubleRowsKey upper="4" lower="+" />
                <DoubleRowsKey upper="6" lower="]" />
                <DoubleRowsKey upper="8" lower="!" />
                <DoubleRowsKey upper="`" lower="#" />
                <div className={`${styles.key} ${styles.delete}`}>Delete</div>
                <div className={`${styles.key} ${styles.tab}`}>Tab</div>
                <DoubleRowsKey upper=":" lower=";" />
                <DoubleRowsKey upper="&lt;" lower="," />
                <DoubleRowsKey upper="&gt;" lower="." />
                <SingleKey char="P" />
                <SingleKey char="Y" />
                <SingleKey char="F" />
                <SingleKey char="G" />
                <SingleKey char="C" />
                <SingleKey char="R" />
                <SingleKey char="L" />
                <DoubleRowsKey upper="?" lower="/" />
                <DoubleRowsKey upper="^" lower="@" />
                <div
                    className={`${styles.key} ${styles.backslash} ${styles["double-rows"]}`}
                >
                    |
                    <br />\
                </div>
                <div className={`${styles.key} ${styles.capslock}`}>
                    CapsLock
                </div>
                <SingleKey char="A" />
                <SingleKey char="O" />
                <SingleKey char="E" />
                <SingleKey char="U" />
                <SingleKey char="I" />
                <SingleKey char="D" />
                <SingleKey char="H" />
                <SingleKey char="T" />
                <SingleKey char="N" />
                <SingleKey char="S" />
                <DoubleRowsKey upper="_" lower="-" />
                <div className={`${styles.key} ${styles.return}`}>Return</div>
                <div className={`${styles.key} ${styles.leftshift}`}>Shift</div>
                <DoubleRowsKey upper="&#34;" lower="&#39;" />
                <SingleKey char="Q" />
                <SingleKey char="J" />
                <SingleKey char="K" />
                <SingleKey char="X" />
                <SingleKey char="B" />
                <SingleKey char="M" />
                <SingleKey char="W" />
                <SingleKey char="V" />
                <SingleKey char="Z" />
                <div className={`${styles.key} ${styles.rightshift}`}>
                    Shift
                </div>
                <div className={`${styles.key} ${styles.leftctrl}`}>Ctrl</div>
                <SingleKey char="Alt" />
                <div className={`${styles.key} ${styles.command}`}>Command</div>
                <div className={`${styles.key} ${styles.space}`}>Space</div>
                <div className={`${styles.key} ${styles.command}`}>command</div>
                <SingleKey char="Alt" />
                <SingleKey char="Ctrl" />
                <SingleKey char="Fn" />
            </div>
        </div>
    );
}

function SingleKey({ char }: { char: string }) {
    return <div className={styles.key}>{char}</div>;
}

function DoubleRowsKey({ upper, lower }: { upper: string; lower: string }) {
    return (
        <div className={`${styles.key} ${styles["double-rows"]}`}>
            {upper}
            <br />
            {lower}
        </div>
    );
}
