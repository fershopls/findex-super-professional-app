export interface Column {
    key: string;
    label: string;
    filterItems?: {key: string|number, value: string}[];
}

export type Row = Cell[];

export interface Cell {
    column: string;
    value: string;
    columnId?: number|string;
}

export interface SortBy {
    key: string | null;
    ascending: boolean;
}
