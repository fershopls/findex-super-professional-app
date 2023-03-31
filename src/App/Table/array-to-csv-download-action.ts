export function arrayToCSV(array: any[][]): string {
    const csvRows = array.map(row => row.map(cell => (typeof cell === 'string' && cell.includes(',') ? `"${cell}"` : cell)).join(','));
    return csvRows.join('\n');
}

export function arrayToCsvDownload(data: any[][], filename: string): void {
    const csvData = arrayToCSV(data);
    const blob = new Blob([csvData], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
}