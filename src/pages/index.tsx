import styles from "@/styles/Home.module.css";
import Head from "next/head";

import Trainer from "../../components/trainer";
import typingTexts from "../../libs/typingTexts";

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
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/images/favicons/apple-touch-icon.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/images/favicons/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/images/favicons/favicon-16x16.png"
                />

                <link rel="manifest" href="/images/favicons/site.webmanifest" />
            </Head>
            <main>
                <div className={styles["inner-container"]}>
                    <Trainer typingTexts={typingTexts} />
                </div>
            </main>
        </>
    );
}
