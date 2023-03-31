import {Row} from "./Table/types";

export function searchOnEveryRow(query: string, rows: Row[]): Row[] {
    return rows.filter((row): boolean => {
        for (const cell of row) {
            const columnString = cell.value.toLowerCase();

            if (columnString.includes(query.toLowerCase())) {
                return true;
            }
        }

        return false;
    });
}