<template>
  <div class="grid gap-3">
    <ui-search-bar v-model="inputSearch"/>

    <div class="flex flex-wrap items-center gap-5">
      <div class="text-lg text-gray-600">
        <span v-if="inputSearch">Searching <span class="font-bold">"{{ inputSearch }}"</span>.</span>
        Found {{ rows.length }} items.
      </div>

      <div class="flex-grow"></div>

      <ui-button @click="onExport()">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor" class="w-5 h-5">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M9 8.25H7.5a2.25 2.25 0 00-2.25 2.25v9a2.25 2.25 0 002.25 2.25h9a2.25 2.25 0 002.25-2.25v-9a2.25 2.25 0 00-2.25-2.25H15m0-3l-3-3m0 0l-3 3m3-3V15"/>
        </svg>

        <span class="pr-1">Export data</span>
      </ui-button>

      <ui-button @click="onCustomizeColumns()">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" class="w-5 h-5">
          <path fill-rule="evenodd"
                d="M7.84 1.804A1 1 0 018.82 1h2.36a1 1 0 01.98.804l.331 1.652a6.993 6.993 0 011.929 1.115l1.598-.54a1 1 0 011.186.447l1.18 2.044a1 1 0 01-.205 1.251l-1.267 1.113a7.047 7.047 0 010 2.228l1.267 1.113a1 1 0 01.206 1.25l-1.18 2.045a1 1 0 01-1.187.447l-1.598-.54a6.993 6.993 0 01-1.929 1.115l-.33 1.652a1 1 0 01-.98.804H8.82a1 1 0 01-.98-.804l-.331-1.652a6.993 6.993 0 01-1.929-1.115l-1.598.54a1 1 0 01-1.186-.447l-1.18-2.044a1 1 0 01.205-1.251l1.267-1.114a7.05 7.05 0 010-2.227L1.821 7.773a1 1 0 01-.206-1.25l1.18-2.045a1 1 0 011.187-.447l1.598.54A6.993 6.993 0 017.51 3.456l.33-1.652zM10 13a3 3 0 100-6 3 3 0 000 6z"
                clip-rule="evenodd"/>
        </svg>

        <span class="pr-1">Columns</span>
      </ui-button>
    </div>


    <div class="mt-4 bg-white rounded overflow-x-scroll">
      <table class="w-full">
        <thead class="">
        <tr>
          <Column
              v-for="column in computedColumns"
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
        <tr v-for="(row, index) in computedRows" :key="index" class="even:bg-gray-100"
            :class="clickable ? 'hover:bg-yellow-200 cursor-pointer' : ''"
            @click="onClickRow(row)"
        >
          <td v-for="column in computedColumns" :key="column.key" class="px-4 py-3 text-sm">
            {{ row.find(r => r.column === column.key)?.value }}
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <ui-popup
        :show="isCustomizingColumns"
        @hide="isCustomizingColumns = false"
    >
      <div class="text-2xl font-semibold">Customize columns</div>

      <app-checklist
          v-model="selectedColumns"
          :models="columnsForChecklist"
      />

      <ui-button @click="isCustomizingColumns = false">Done</ui-button>
    </ui-popup>
  </div>
</template>

<script lang="ts" setup>
import Column from './Column.vue';
import {Column as ColumnType, Row, SortBy} from "./types";
import {arrayToCsvDownload} from "./array-to-csv-download-action";
import {search, sort, filter} from "@/App/Table/table-filters";

const props = defineProps<{
  columns: ColumnType[];
  rows: Row[];
  clickable?: boolean;
}>();

const emit = defineEmits<{
  (event: 'clickRow', row: Row): void;
}>();

const inputSearch = ref<string>('');
const isCustomizingColumns = ref<boolean>(false);
const selectedColumns = ref<string[]>(props.columns.map(column => column.key));

const sortBy = ref<SortBy>({key: null, ascending: true});
const filtersByColumnKey = ref<{ [key: string]: (number | string)[] }>({});

// Computed columns with selected columns
const computedColumns = computed<ColumnType[]>(() => {
  return props.columns.filter(column => selectedColumns.value.includes(column.key));
});

// Computed rows with search, filters, and sort applied
const computedRows = computed<Row[]>(() => {
  let rows = props.rows;
  // Search
  if (inputSearch.value) {
    rows = search(inputSearch.value, rows);
  }
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

function onClickRow(row: Row) {
  if (props.clickable === true) {
    emit('clickRow', row);
  }
}

function onCustomizeColumns() {
  isCustomizingColumns.value = true;
}

const columnsForChecklist = computed(() => {
  return props.columns.map(column => ({
    key: column.key,
    value: column.label,
  }));
});
</script>