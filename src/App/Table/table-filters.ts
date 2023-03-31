import {Row, SortBy} from "@/App/Table/types";

export function filter(filtersByColumnKey: { [key: string]: (number | string)[] }, rows: Row[]): Row[] {
    // For every row
    return rows.filter(row => {
        // Iterate though all column applied filters
        for (const columnKey in filtersByColumnKey) {
            // Get the cell for this column
            const cell = row.find(r => r.column === columnKey);
            if (!cell || !cell.columnId) {
                // If the cell is not found or the cell has no id, then we can't filter
                return false;
            }

            // Get the column id of the cell
            const columnId = cell.columnId;

            // If there are no filters for this column, skip the row
            if (!filtersByColumnKey[columnKey] || filtersByColumnKey[columnKey].length === 0) {
                continue;
            }

            // If the column id is not in the filters, skip the row
            if (!filtersByColumnKey[columnKey].includes(columnId)) {
                return false;
            }
        }

        // All filters passed, return the row
        return true;
    });
}

export function sort(sortBy: SortBy, rows: Row[]): Row[] {
    if (!sortBy.key) {
        return rows;
    }

    return rows.sort((a, b) => {
        // Perform a simple sorting
        const aCell = a.find(r => r.column === sortBy.key);
        const bCell = b.find(r => r.column === sortBy.key);

        if (!aCell || !bCell) {
            return 0;
        }

        // Lowercase the values for a more natural sorting
        const aCellValue = aCell.value.toLowerCase();
        const bCellValue = bCell.value.toLowerCase();

        if (aCellValue < bCellValue) {
            return sortBy.ascending ? -1 : 1;
        }

        if (aCellValue > bCellValue) {
            return sortBy.ascending ? 1 : -1;
        }

        return 0;
    });
}