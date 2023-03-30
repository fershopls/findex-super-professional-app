<template>
  <layout-app>
    <div class="grid gap-4">
      <ui-logo/>

      <div class="text-lg text-gray-600">
        Showing {{ rows.length }} deals.
      </div>

      <div class="">
        <input type="text" v-model="inputSearch" class="py-3 text-lg px-3 rounded shadow ring-0 outline-0"
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