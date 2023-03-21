import { Source_Code_Pro } from "next/font/google";

import escapeSpace from "../utils/escapeSpace";
import styles from "./display.module.css";

const sourceCodePro = Source_Code_Pro({
    weight: "400",
    subsets: ["latin"],
});

export default function Display({ text }: { text: string }) {
    return (
        <div className={`${styles.container} ${sourceCodePro.className}`}>
            <div className={styles["main-text"]}>{escapeSpace(text)}</div>
        </div>
    );
}
