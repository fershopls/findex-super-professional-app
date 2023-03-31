import dayjs from "dayjs";
import {Column} from "@/App/Table/types";
import {Doc} from "@/types-docs";
import {bytesToHumanReadableSize} from "@/support";


export const columns: Column[] = [
    { key: 'name', label: 'Name' },
    { key: 'status', label: 'Status' },
    { key: 'directory', label: 'Directory' },
    { key: 'file', label: 'File' },
    { key: 'size', label: 'Size' },
    { key: 'created', label: 'Created At' },
];

export function getDocumentRows(documents: Doc[]) {
    return documents.map(document => [
        {
            column: 'name',
            value: document.display_name,
        },
        {
            column: 'file',
            value: document.name,
        },
        {
            column: 'status',
            value: document.status_name,
        },
        {
            column: 'created',
            value: dayjs(document.created).format('MMM D, YYYY'),
            sortValue: dayjs(document.created).unix(),
        },
        {
            column: 'directory',
            value: document.system_folder_name,
        },
        {
            column: 'size',
            value: bytesToHumanReadableSize(parseInt(document.size)),
            sortValue: parseInt(document.size),
        },
    ]);
}