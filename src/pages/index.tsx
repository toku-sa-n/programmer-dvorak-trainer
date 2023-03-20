import styles from "@/styles/Home.module.css";
import Head from "next/head";

import Trainer from "../../components/trainer";

export default function Home() {
    return (
        <>
            <Head>
                <title>Programmer Dvorak trainer</title>
                <meta
                    name="description"
                    content="Practice typing in the Programming Dvorak layout."
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <main>
                <div className={styles["inner-container"]}>
                    <Trainer />
                </div>
            </main>
        </>
    );
}
