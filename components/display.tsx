import styles from "./display.module.css";

export default function Display() {
    return (
        <div className={styles.container}>
            <div className={styles["main-text"]}>
                e=2.718281828459045235360287471352662497757247093699959574966967627724076630353
            </div>
        </div>
    );
}
