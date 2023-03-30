<template>
  <layout-app>
    <div class="grid gap-4">
      <ui-logo/>

      <div class="text-lg text-gray-600">
        Showing {{ rows.length }} deals.
      </div>

      <div class="bg-white flex pl-3 text-lg rounded shadow gap-4 items-center">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
          <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
        </svg>

        <input type="text" v-model="inputSearch" class="ring-0 outline-0 flex-grow py-3 rounded"
               placeholder="Search">
      </div>

      {{ inputSearch }}
      <app-table v-if="rows.length" :rows="rows"/>
    </div>
  </layout-app>
</template>

<script lang="ts" setup>
import dataset from '@/data/deals_dataset.json';

const datasetRows = dataset['data']['Holdings'];


const inputSearch = ref('');

const rows = computed(() => {
  return datasetRows.filter((row) => row['DealName'].includes(inputSearch.value));
});
</script>