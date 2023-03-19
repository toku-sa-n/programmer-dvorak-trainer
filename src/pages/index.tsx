import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import Keyboard from "../../components/keyboard";
import Display from "../../components/display";

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
                    <Display />
                    <Keyboard />
                </div>
            </main>
        </>
    );
}
