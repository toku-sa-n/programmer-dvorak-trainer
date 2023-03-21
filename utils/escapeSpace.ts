// Replaces all spaces with `\u00A0`.
// This is necessary to render spaces on the browser
// as it ignores spaces at the start or at the end.
export default function escapeSpace(s: string): string {
    return s.replace(/ /g, "\u00A0");
}
