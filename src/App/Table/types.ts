export interface Column {
    key: string;
    label: string;
}

export type Row = Cell[];

export interface Cell {
    column: string;
    value: string;
}