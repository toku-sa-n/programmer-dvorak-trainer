import styles from "./keyboard.module.css";

// The license for the HTML code representing the keyboard is at `/licenses/keyboard`.
export default function SingleRowKeyboard() {
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
                <SingleRowKey char="Delete" specialKey="delete" />
                <SingleRowKey char="Tab" specialKey="tab" />
                <DoubleRowsKey upper=":" lower=";" />
                <DoubleRowsKey upper="&lt;" lower="," />
                <DoubleRowsKey upper="&gt;" lower="." />
                <SingleRowKey char="P" />
                <SingleRowKey char="Y" />
                <SingleRowKey char="F" />
                <SingleRowKey char="G" />
                <SingleRowKey char="C" />
                <SingleRowKey char="R" />
                <SingleRowKey char="L" />
                <DoubleRowsKey upper="?" lower="/" />
                <DoubleRowsKey upper="^" lower="@" />
                <div
                    className={`${styles.key} ${styles.backslash} ${styles["double-rows"]}`}
                >
                    |
                    <br />\
                </div>
                <SingleRowKey char="CapsLock" specialKey="capslock" />
                <SingleRowKey char="A" />
                <SingleRowKey char="O" />
                <SingleRowKey char="E" />
                <SingleRowKey char="U" />
                <SingleRowKey char="I" />
                <SingleRowKey char="D" />
                <SingleRowKey char="H" />
                <SingleRowKey char="T" />
                <SingleRowKey char="N" />
                <SingleRowKey char="S" />
                <DoubleRowsKey upper="_" lower="-" />
                <SingleRowKey char="Return" specialKey="return" />
                <SingleRowKey char="Shift" specialKey="leftshift" />
                <DoubleRowsKey upper="&#34;" lower="&#39;" />
                <SingleRowKey char="Q" />
                <SingleRowKey char="J" />
                <SingleRowKey char="K" />
                <SingleRowKey char="X" />
                <SingleRowKey char="B" />
                <SingleRowKey char="M" />
                <SingleRowKey char="W" />
                <SingleRowKey char="V" />
                <SingleRowKey char="Z" />
                <SingleRowKey char="Shift" specialKey="rightshift" />
                <SingleRowKey char="Ctrl" specialKey="leftctrl" />
                <SingleRowKey char="Alt" />
                <SingleRowKey char="Command" specialKey="command" />
                <SingleRowKey char="Space" specialKey="space" />
                <SingleRowKey char="Command" specialKey="command" />
                <SingleRowKey char="Alt" />
                <SingleRowKey char="Ctrl" />
                <SingleRowKey char="Fn" />
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

function SingleRowKey({
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
