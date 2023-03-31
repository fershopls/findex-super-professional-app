<template>
  <div class="grid">
    <div class="flex justify-end gap-5">
      <a href="https://github.com/fershopls/findex-super-professional-app" target="_blank">
        <ui-button>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-5 h-5">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5"/>
          </svg>

          <span class="pr-1">See GithubCode</span>
        </ui-button>
      </a>
      <ui-button @click="onExport()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
        </svg>

        <span class="pr-1">Export data</span>
      </ui-button>
    </div>


    <div class="mt-4 bg-white rounded overflow-x-scroll">
      <table class="">
        <thead class="">
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
        <tr v-for="(row, index) in computedRows" :key="index" class="even:bg-gray-100 hover:bg-yellow-200 cursor-pointer"
            @click="onClickRow(row)"
        >
          <td v-for="column in columns" :key="column.key" class="px-4 py-3 text-sm">
            {{ row.find(r => r.column === column.key)?.value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Column from './Column.vue';
import {Column as ColumnType, Row, SortBy} from "./types";
import {arrayToCsvDownload} from "./array-to-csv-download-action";
import {sort, filter} from "@/App/Table/table-filters";

const props = defineProps<{
  columns: ColumnType[];
  rows: Row[];
}>();

const emit = defineEmits<{
    (event: 'onClickRow', row: Row): void;
}>();

const sortBy = ref<SortBy>({key: null, ascending: true});

const filtersByColumnKey = ref<{ [key: string]: (number | string)[] }>({});

const computedRows = computed<Row[]>(() => {
  let rows = props.rows;
  // Filter
  rows = filter(filtersByColumnKey.value, rows);
  // Sort
  rows = sort(sortBy.value, rows);
  return rows;
});

function onSortBy(key: string, ascending: boolean) {
  sortBy.value.key = key;
  sortBy.value.ascending = ascending;
}

function onExport() {
  let data: any = [];

  // Add the header
  const headers = props.columns.map(column => column.label);

  // Add the rows
  const rows = computedRows.value.map((row: Row) => {
    return props.columns.map(column => {
      const cell = row.find(r => r.column === column.key);
      return cell?.value ?? '';
    });
  });

  data.push(headers);
  data = data.concat(rows);

  arrayToCsvDownload(data, 'export.csv');
}
</script>