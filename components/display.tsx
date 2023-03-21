import { Source_Code_Pro } from "next/font/google";

import escapeSpace from "../src/escapeSpace";
import styles from "./display.module.css";

const sourceCodePro = Source_Code_Pro({
    weight: "400",
    subsets: ["latin"],
});

export default function Display({ text }: { text: string }) {
    const escaped = escapeSpace(text);
    const head = escaped[0];
    const tail = escaped.slice(1);

    return (
        <div className={`${styles.container} ${sourceCodePro.className}`}>
            <div className={styles["main-text"]}>
                <span className={styles["first-character"]}>{head}</span>
                {tail}
            </div>
        </div>
    );
}
