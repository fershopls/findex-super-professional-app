<template>
  <layout-app>
    <div class="grid gap-4 pb-24">
      <ui-logo/>

      <ui-search-bar v-model="inputSearch"/>

      <div class="text-lg text-gray-600">
        <span v-if="inputSearch">Searching <span class="font-bold">"{{ inputSearch }}"</span>.</span>
        Found {{ rows.length }} deals.
      </div>

      <app-table
          v-show="rows.length"
          :search="inputSearch"
          :columns="columns"
          :rows="rows"
          @clickRow="onClickRow"
      />

      <ui-popup
          :show="selectedRow !== null"
          @hide="selectedRow = null"
      >
        {{ findDocumentsForRow(selectedRow).length }} documents found
      </ui-popup>
    </div>
  </layout-app>
</template>

<script lang="ts" setup>
import {getDocumentsByDealId} from './api';
import {Row} from "./Table/types";
import {columns, rows} from "@/App/table-deals";

const inputSearch = ref('');

const selectedRow = ref<Row | null>(null);
function onClickRow(row: Row) {
  selectedRow.value = row;
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