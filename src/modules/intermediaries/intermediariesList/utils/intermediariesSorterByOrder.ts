import { sortBy, prop } from "ramda";

export const intermediariesSorterByOrder = sortBy(prop("order"));
