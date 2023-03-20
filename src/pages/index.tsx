import styles from "@/styles/Home.module.css";
import { Inter } from "next/font/google";
import Head from "next/head";
import Image from "next/image";

import Display from "../../components/display";
import Keyboard from "../../components/keyboard";
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
