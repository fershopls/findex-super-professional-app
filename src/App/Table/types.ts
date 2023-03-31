export interface Column {
    key: string;
    label: string;
    filterItems?: {key: string|number, value: string}[];
}

export type Row = Cell[];

export interface Cell {
    column: string;
    value: string;
    sortValue?: string|number;
    columnId?: number|string;
}

export interface SortBy {
    key: string | null;
    ascending: boolean;
}
