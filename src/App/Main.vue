<template>
  <layout-app>
    <div class="grid gap-4 pb-24">
      <ui-logo/>

      <app-table
          v-show="rows.length"
          :search="inputSearch"
          :columns="columns"
          :rows="rows"
          clickable
          @clickRow="onClickDeal"
      />

      <ui-popup
          :show="documentRows.length > 0"
          @hide="documentRows = []"
      >
        <div class="flex items-center gap-2 border-b pb-4">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="w-8 h-8">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M10.125 2.25h-4.5c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125v-9M10.125 2.25h.375a9 9 0 019 9v.375M10.125 2.25A3.375 3.375 0 0113.5 5.625v1.5c0 .621.504 1.125 1.125 1.125h1.5a3.375 3.375 0 013.375 3.375M9 15l2.25 2.25L15 12"/>
          </svg>
          <div class="text-center text-3xl font-semibold">
            Document List
          </div>
        </div>

        <app-table
            :columns="docColumns"
            :rows="documentRows"
        />
      </ui-popup>
    </div>
  </layout-app>
</template>

<script lang="ts" setup>
import {getDocumentsByDealId} from './api';
import {Row} from "./Table/types";
import {columns, rows} from "@/App/table-deals";
import {columns as docColumns, getDocumentRows} from "./table-docs";

const inputSearch = ref('');

const documentRows = ref<Row[]>([]);

function onClickDeal(row: Row) {
  documentRows.value = getDocumentRows(findDocumentsForRow(row))
}

function findDocumentsForRow(row: Row) {
  const dealColumn = row.find(x => x.column === 'deal');

  if (!dealColumn) {
    throw new Error('Deal column not found');
  }

  const dealId = dealColumn.columnId;

  if (!dealId) {
    throw new Error('Deal id not found');
  }

  return getDocumentsByDealId(dealId);
}
</script>
