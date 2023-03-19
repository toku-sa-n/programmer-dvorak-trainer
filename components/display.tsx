import styles from "./display.module.css";

export default function Display({ text }: { text: string }) {
    const escapedText = text.replace(/ /g, "\u00A0");

    return (
        <div className={styles.container}>
            <div className={styles["main-text"]}>{escapedText}</div>
        </div>
    );
}
