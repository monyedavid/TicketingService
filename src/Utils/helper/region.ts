import {
    region_ghana,
    region_liberia,
    region_nigeria,
    region_senegal
} from "../constants";

export default (value: string) => {
    return (
        value == region_ghana ||
        value == region_liberia ||
        value == region_nigeria ||
        value == region_senegal
    );
};

export function isNg(value: string) {
    return value == region_nigeria;
}
