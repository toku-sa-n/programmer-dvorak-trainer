type SingleRowKeyDefinition = {
    readonly type: "SingleRowKey";
    readonly char: string;
    readonly code: string | null;
    readonly isHomePosition: boolean;
};

export default SingleRowKeyDefinition;
