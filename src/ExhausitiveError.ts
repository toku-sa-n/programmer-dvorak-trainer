// The license for this class is at `/licenses/YYTypeScript`.
export default class ExhaustiveError extends Error {
    constructor(value: never, message = `Unsupported type: ${value}`) {
        super(message);
    }
}
