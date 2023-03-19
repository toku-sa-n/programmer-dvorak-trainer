import { useEffect, useState } from "react";
import styles from "./display.module.css";

const original = "e=2.7";

export default function Display() {
    const [text, setText] = useState(original);

    useEffect(() => {
        function onKeyDown(e: KeyboardEvent) {
            if (e.key !== text[0]) {
                return;
            }

            setText((text) => {
                if (text.length === 1) {
                    return original;
                } else {
                    return text.slice(1);
                }
            });
        }

        document.addEventListener("keydown", onKeyDown);

        return () => {
            document.removeEventListener("keydown", onKeyDown);
        };
    }, [text, setText]);

    return (
        <div className={styles.container}>
            <div className={styles["main-text"]}>{text}</div>
        </div>
    );
}
