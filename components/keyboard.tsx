import styles from "./keyboard.module.css";

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function SingleKeyboard() {
    return (
        <div className={styles["keyboard-container"]}>
            <div className={styles["keyboard-base"]}>
                <DoubleRowsKey upper="~" lower="$" />
                <DoubleRowsKey upper="%" lower="&" />
                <DoubleRowsKey upper="7" lower="[" />
                <DoubleRowsKey upper="5" lower="&#123;" />
                <DoubleRowsKey upper="3" lower="&#125;" />
                <DoubleRowsKey upper="1" lower="(" />
                <DoubleRowsKey upper="9" lower="=" />
                <DoubleRowsKey upper="0" lower="*" />
                <DoubleRowsKey upper="2" lower=")" />
                <DoubleRowsKey upper="4" lower="+" />
                <DoubleRowsKey upper="6" lower="]" />
                <DoubleRowsKey upper="8" lower="!" />
                <DoubleRowsKey upper="`" lower="#" />
                <SingleKey char="Delete" specialKey="delete" />
                <SingleKey char="Tab" specialKey="tab" />
                <DoubleRowsKey upper=":" lower=";" />
                <DoubleRowsKey upper="&lt;" lower="," />
                <DoubleRowsKey upper="&gt;" lower="." />
                <SingleKey char="P" />
                <SingleKey char="Y" />
                <SingleKey char="F" />
                <SingleKey char="G" />
                <SingleKey char="C" />
                <SingleKey char="R" />
                <SingleKey char="L" />
                <DoubleRowsKey upper="?" lower="/" />
                <DoubleRowsKey upper="^" lower="@" />
                <div
                    className={`${styles.key} ${styles.backslash} ${styles["double-rows"]}`}
                >
                    |
                    <br />\
                </div>
                <SingleKey char="CapsLock" specialKey="capslock" />
                <SingleKey char="A" />
                <SingleKey char="O" />
                <SingleKey char="E" />
                <SingleKey char="U" />
                <SingleKey char="I" />
                <SingleKey char="D" />
                <SingleKey char="H" />
                <SingleKey char="T" />
                <SingleKey char="N" />
                <SingleKey char="S" />
                <DoubleRowsKey upper="_" lower="-" />
                <SingleKey char="Return" specialKey="return" />
                <SingleKey char="Shift" specialKey="leftshift" />
                <DoubleRowsKey upper="&#34;" lower="&#39;" />
                <SingleKey char="Q" />
                <SingleKey char="J" />
                <SingleKey char="K" />
                <SingleKey char="X" />
                <SingleKey char="B" />
                <SingleKey char="M" />
                <SingleKey char="W" />
                <SingleKey char="V" />
                <SingleKey char="Z" />
                <SingleKey char="Shift" specialKey="rightshift" />
                <SingleKey char="Ctrl" specialKey="leftctrl" />
                <SingleKey char="Alt" />
                <SingleKey char="Command" specialKey="command" />
                <SingleKey char="Space" specialKey="space" />
                <SingleKey char="Command" specialKey="command" />
                <SingleKey char="Alt" />
                <SingleKey char="Ctrl" />
                <SingleKey char="Fn" />
            </div>
        </div>
    );
}

type SpecialKeys =
    | "backslash"
    | "capslock"
    | "command"
    | "delete"
    | "leftctrl"
    | "leftshift"
    | "return"
    | "rightshift"
    | "space"
    | "tab";

function SingleKey({
    char,
    specialKey,
}: {
    char: string;
    specialKey?: SpecialKeys;
}) {
    let css = styles.key;

    switch (specialKey) {
        case "backslash":
            css += " " + styles.backslash;
            break;
        case "capslock":
            css += " " + styles.capslock;
            break;
        case "command":
            css += " " + styles.command;
            break;
        case "delete":
            css += " " + styles.delete;
            break;
        case "leftctrl":
            css += " " + styles.leftctrl;
            break;
        case "leftshift":
            css += " " + styles.leftshift;
            break;
        case "return":
            css += " " + styles.return;
            break;
        case "rightshift":
            css += " " + styles.rightshift;
            break;
        case "space":
            css += " " + styles.space;
            break;
        case "tab":
            css += " " + styles.tab;
            break;
        default:
            new SyntaxError("Invalid key is passed.");
            break;
    }

    return <div className={css}>{char}</div>;
}

function DoubleRowsKey({ upper, lower }: { upper: string; lower: string }) {
    return (
        <div className={`${styles.key} ${styles["double-rows"]}`}>
            {upper}
            <br />
            {lower}
        </div>
    );
}
