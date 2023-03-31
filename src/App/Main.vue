<template>
  <layout-app>
    <div class="grid gap-4">
      <ui-logo/>

      <ui-search-bar v-model="inputSearch" />

      <div class="text-lg text-gray-600">
        <span v-if="inputSearch">Searching <span class="font-bold">"{{ inputSearch }}"</span>.</span>
        Found {{ rows.length }} deals.
      </div>

      <app-table v-if="rows.length" :rows="rows"/>
    </div>
  </layout-app>
</template>

<script lang="ts" setup>
import dataset from '@/data/deals_dataset.json';
import {searchOnEveryColumn} from "./search-on-every-column-action";

const datasetRows = dataset['data']['Holdings'];


const inputSearch = ref('');

const rows = computed(() => {
  const query = inputSearch.value;
  return searchOnEveryColumn(query, datasetRows);
});
</script>