import KeyDefinition from "./KeyDefinition";

const keys: ReadonlyArray<KeyDefinition> = [
    { type: "DoubleRowsKey", upper: "~", lower: "$", code: "Backquote" },
    { type: "DoubleRowsKey", upper: "%", lower: "&", code: "Digit1" },
    { type: "DoubleRowsKey", upper: "7", lower: "[", code: "Digit2" },
    { type: "DoubleRowsKey", upper: "5", lower: "{", code: "Digit3" },
    { type: "DoubleRowsKey", upper: "3", lower: "}", code: "Digit4" },
    { type: "DoubleRowsKey", upper: "1", lower: "(", code: "Digit5" },
    { type: "DoubleRowsKey", upper: "9", lower: "=", code: "Digit6" },
    { type: "DoubleRowsKey", upper: "0", lower: "*", code: "Digit7" },
    { type: "DoubleRowsKey", upper: "2", lower: ")", code: "Digit8" },
    { type: "DoubleRowsKey", upper: "4", lower: "+", code: "Digit9" },
    { type: "DoubleRowsKey", upper: "6", lower: "]", code: "Digit0" },
    { type: "DoubleRowsKey", upper: "8", lower: "!", code: "Minus" },
    { type: "DoubleRowsKey", upper: "`", lower: "#", code: "Equal" },
    { type: "SpecialKey", name: "delete", code: "Backspace" },
    { type: "SpecialKey", name: "tab", code: "Tab" },
    { type: "DoubleRowsKey", upper: ":", lower: ";", code: "KeyQ" },
    { type: "DoubleRowsKey", upper: "<", lower: ",", code: "KeyW" },
    { type: "DoubleRowsKey", upper: ">", lower: ".", code: "KeyE" },
    { type: "SingleRowKey", char: "P", code: "KeyR", isHomePosition: false },
    { type: "SingleRowKey", char: "Y", code: "KeyT", isHomePosition: false },
    { type: "SingleRowKey", char: "F", code: "KeyY", isHomePosition: false },
    { type: "SingleRowKey", char: "G", code: "KeyU", isHomePosition: false },
    { type: "SingleRowKey", char: "C", code: "KeyI", isHomePosition: false },
    { type: "SingleRowKey", char: "R", code: "KeyO", isHomePosition: false },
    { type: "SingleRowKey", char: "L", code: "KeyP", isHomePosition: false },
    { type: "DoubleRowsKey", upper: "?", lower: "/", code: "BracketLeft" },
    { type: "DoubleRowsKey", upper: "^", lower: "@", code: "BracketRight" },
    { type: "SpecialKey", name: "backslash", code: "Backslash" },
    { type: "SpecialKey", name: "capslock", code: "CapsLock" },
    { type: "SingleRowKey", char: "A", code: "KeyA", isHomePosition: false },
    { type: "SingleRowKey", char: "O", code: "KeyS", isHomePosition: false },
    { type: "SingleRowKey", char: "E", code: "KeyD", isHomePosition: false },
    { type: "SingleRowKey", char: "U", code: "KeyF", isHomePosition: true },
    { type: "SingleRowKey", char: "I", code: "KeyG", isHomePosition: false },
    { type: "SingleRowKey", char: "D", code: "KeyH", isHomePosition: false },
    { type: "SingleRowKey", char: "H", code: "KeyJ", isHomePosition: true },
    { type: "SingleRowKey", char: "T", code: "KeyK", isHomePosition: false },
    { type: "SingleRowKey", char: "N", code: "KeyL", isHomePosition: false },
    {
        type: "SingleRowKey",
        char: "S",
        code: "Semicolon",
        isHomePosition: false,
    },
    { type: "DoubleRowsKey", upper: "_", lower: "-", code: "Quote" },
    { type: "SpecialKey", name: "return", code: "Enter" },
    { type: "SpecialKey", name: "leftshift", code: "ShiftLeft" },
    { type: "DoubleRowsKey", upper: '"', lower: "'", code: "KeyZ" },
    { type: "SingleRowKey", char: "Q", code: "KeyX", isHomePosition: false },
    { type: "SingleRowKey", char: "J", code: "KeyC", isHomePosition: false },
    { type: "SingleRowKey", char: "K", code: "KeyV", isHomePosition: false },
    { type: "SingleRowKey", char: "X", code: "KeyB", isHomePosition: false },
    { type: "SingleRowKey", char: "B", code: "KeyN", isHomePosition: false },
    { type: "SingleRowKey", char: "M", code: "KeyM", isHomePosition: false },
    { type: "SingleRowKey", char: "W", code: "Comma", isHomePosition: false },
    { type: "SingleRowKey", char: "V", code: "Period", isHomePosition: false },
    { type: "SingleRowKey", char: "Z", code: "Slash", isHomePosition: false },
    { type: "SpecialKey", name: "rightshift", code: "ShiftRight" },
    { type: "SpecialKey", name: "leftctrl", code: "ControlLeft" },
    {
        type: "SingleRowKey",
        char: "Alt",
        code: "AltLeft",
        isHomePosition: false,
    },
    { type: "SpecialKey", name: "command", code: "OSLeft" },
    { type: "SpecialKey", name: "space", code: "Space" },
    { type: "SpecialKey", name: "command", code: "OSRight" },
    {
        type: "SingleRowKey",
        char: "Alt",
        code: "AltRight",
        isHomePosition: false,
    },
    {
        type: "SingleRowKey",
        char: "Ctrl",
        code: "ControlRight",
        isHomePosition: false,
    },
    {
        type: "SingleRowKey",
        char: "Fn",
        code: null,
        isHomePosition: false,
    },
] as const;

export default keys;