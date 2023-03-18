import styles from "./keyboard.module.css";

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function SingleKeyboard() {
    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    ~
                    <br />$
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    %<br />&
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    7<br />[
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    5
                    <br />
                    &#123;
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    3
                    <br />
                    &#125;
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    1
                    <br />(
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    9
                    <br />=
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    0
                    <br />*
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    2
                    <br />)
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    4
                    <br />+
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    6
                    <br />]
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    8
                    <br />!
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    `
                    <br />#
                </div>
                <div className={`${styles.key} ${styles.delete}`}>Delete</div>
                <div className={`${styles.key} ${styles.tab}`}>Tab</div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    :
                    <br />;
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    &lt;
                    <br />,
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    &gt;
                    <br />.
                </div>
                <SingleKey char="P" />
                <SingleKey char="Y" />
                <SingleKey char="F" />
                <SingleKey char="G" />
                <SingleKey char="C" />
                <SingleKey char="R" />
                <SingleKey char="L" />
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    ?
                    <br />/
                </div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    ^
                    <br />@
                </div>
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
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    _
                    <br />-
                </div>
                <div className={`${styles.key} ${styles.return}`}>Return</div>
                <div className={`${styles.key} ${styles.leftshift}`}>Shift</div>
                <div className={`${styles.key} ${styles["double-rows"]}`}>
                    &#34;
                    <br />
                    &#39;
                </div>
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
                <div className={styles.key}>Alt</div>
                <div className={`${styles.key} ${styles.command}`}>Command</div>
                <div className={`${styles.key} ${styles.space}`}>Space</div>
                <div className={`${styles.key} ${styles.command}`}>command</div>
                <div className={styles.key}>Alt</div>
                <div className={styles.key}>Ctrl</div>
                <div className={styles.key}>Fn</div>
            </div>
        </div>
    );
}

function SingleKey({ char }: { char: string }) {
    return <div className={styles.key}>{char}</div>;
}
