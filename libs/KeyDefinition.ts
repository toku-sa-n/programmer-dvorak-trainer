import DoubleRowsKeyDefinition from "./DoubleRowsKeyDefinition";
import SingleRowKeyDefinition from "./SingleRowKeyDefinition";
import SpecialKeyDefinition from "./SpecialKeyDefinition";

type KeyDefinition =
    | SingleRowKeyDefinition
    | DoubleRowsKeyDefinition
    | SpecialKeyDefinition;

export default KeyDefinition;
