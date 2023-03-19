import styles from "./display.module.css";

export default function Display({ text }: { text: string }) {
    return (
        <div className={styles.container}>
            <div className={styles["main-text"]}>{text}</div>
        </div>
    );
}
