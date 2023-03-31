type Row = {[key: string]: any};

/**
 * Searches for the given query in every column of each row in the rows array.
 * Only string and number column values are considered for the search.
 * The search is case-insensitive.
 *
 * @param query - The search term to find in the columns.
 * @param rows - An array of Row objects where each Row represents a single row with various columns.
 * @returns An array of Row objects that contain the query in any of its columns.
 */
export function searchOnEveryColumn(query: string, rows: Row[]): Row[] {
    return rows.filter((row): boolean => {
        for (const key in row) {
            const doesPropertyExists = Object.prototype.hasOwnProperty.call(row, key);
            const doesValueIsString = typeof row[key] === 'string';
            const doesValueIsNumber = typeof row[key] === 'number';

            if (doesPropertyExists === false) {
                continue;
            }

            if (doesValueIsNumber || doesValueIsString) {
                const columnString = row[key].toString().toLowerCase();
                if (columnString.includes(query.toLowerCase())) {
                    return true;
                }
            }
        }

        return false;
    });
}