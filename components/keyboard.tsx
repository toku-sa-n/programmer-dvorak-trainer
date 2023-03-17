import styles from "./keyboard.module.css";

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function Keyboard() {
    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>
                <div className={styles.key}>$</div>
                <div className={styles.key}>&</div>
                <div className={styles.key}>[</div>
                <div className={styles.key}>&#123;</div>
                <div className={styles.key}>&#125;</div>
                <div className={styles.key}>(</div>
                <div className={styles.key}>=</div>
                <div className={styles.key}>*</div>
                <div className={styles.key}>)</div>
                <div className={styles.key}>+</div>
                <div className={styles.key}>]</div>
                <div className={styles.key}>!</div>
                <div className={styles.key}>#</div>
                <div className={`${styles.key} ${styles.delete}`}>Delete</div>
                <div className={`${styles.key} ${styles.tab}`}>Tab</div>
                <div className={styles.key}>;</div>
                <div className={styles.key}>,</div>
                <div className={styles.key}>.</div>
                <div className={styles.key}>P</div>
                <div className={styles.key}>Y</div>
                <div className={styles.key}>F</div>
                <div className={styles.key}>G</div>
                <div className={styles.key}>C</div>
                <div className={styles.key}>R</div>
                <div className={styles.key}>L</div>
                <div className={styles.key}>/</div>
                <div className={styles.key}>@</div>
                <div className={`${styles.key} ${styles.backslash}`}>\</div>
                <div className={`${styles.key} ${styles.capslock}`}>
                    CapsLock
                </div>
                <div className={styles.key}>A</div>
                <div className={styles.key}>O</div>
                <div className={styles.key}>E</div>
                <div className={styles.key}>U</div>
                <div className={styles.key}>I</div>
                <div className={styles.key}>D</div>
                <div className={styles.key}>H</div>
                <div className={styles.key}>T</div>
                <div className={styles.key}>N</div>
                <div className={styles.key}>S</div>
                <div className={styles.key}>-</div>
                <div className={`${styles.key} ${styles.return}`}>Return</div>
                <div className={`${styles.key} ${styles.leftshift}`}>Shift</div>
                <div className={styles.key}>"</div>
                <div className={styles.key}>Q</div>
                <div className={styles.key}>J</div>
                <div className={styles.key}>K</div>
                <div className={styles.key}>X</div>
                <div className={styles.key}>B</div>
                <div className={styles.key}>M</div>
                <div className={styles.key}>W</div>
                <div className={styles.key}>V</div>
                <div className={styles.key}>Z</div>
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
