<template>
  <div class="overflow-x-auto bg-white rounded">
    <table class="w-full">
      <thead class="border-b">
      <tr>
        <Column
            v-for="column in columns"
            :key="column.key"
            :column="column"
            :checklist="filtersByColumnKey[column.key] ?? []"
            @update:checklist="filtersByColumnKey[column.key] = $event"
            :sort-by="sortBy"
            @update:sortBy="onSortBy(column.key, $event)"
        >
        </Column>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in sort(filter(rows))" :key="row.id" class="even:bg-gray-100">
        <td v-for="column in columns" :key="column.key" class="px-4 py-3 text-sm">
          {{ row.find(r => r.column === column.key)?.value }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import Column from './Column.vue';
import {Column as ColumnType, Row, SortBy} from "./types";

const props = defineProps<{
  columns: ColumnType[];
  rows: Row[];
}>();

const filtersByColumnKey = ref<{ [key: string]: (number | string)[] }>({});

function filter(rows: Row[]): Row[] {
  // For every row
  return rows.filter(row => {
    // Iterate though all column applied filters
    for (const columnKey in filtersByColumnKey.value) {
      // Get the cell for this column
      const cell = row.find(r => r.column === columnKey);
      if (!cell || !cell.columnId) {
        // If the cell is not found or the cell has no id, then we can't filter
        return false;
      }

      // Get the column id of the cell
      const columnId = cell.columnId;

      // If there are no filters for this column, skip the row
      if (!filtersByColumnKey.value[columnKey] || filtersByColumnKey.value[columnKey].length === 0) {
        continue;
      }

      // If the column id is not in the filters, skip the row
      if (!filtersByColumnKey.value[columnKey].includes(columnId)) {
        return false;
      }
    }

    // All filters passed, return the row
    return true;
  });
}

function sort(rows: Row[]): Row[] {
  if (!sortBy.value.key) {
    return rows;
  }

  return rows.sort((a, b) => {
    // Perform a simple sorting
    const aCell = a.find(r => r.column === sortBy.value.key);
    const bCell = b.find(r => r.column === sortBy.value.key);

    if (!aCell || !bCell) {
      return 0;
    }

    // Lowercase the values for a more natural sorting
    const aCellValue = aCell.value.toLowerCase();
    const bCellValue = bCell.value.toLowerCase();

    if (aCellValue < bCellValue) {
      return sortBy.value.ascending ? -1 : 1;
    }

    if (aCellValue > bCellValue) {
      return sortBy.value.ascending ? 1 : -1;
    }

    return 0;
  });
}

const sortBy = ref<SortBy>({key: null, ascending: true});

function onSortBy(key: string, ascending: boolean) {
  sortBy.value.key = key;
  sortBy.value.ascending = ascending;
}
</script>