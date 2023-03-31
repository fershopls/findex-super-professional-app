<template>
  <layout-app>
    <div class="grid gap-4">
      <ui-logo/>

      <ui-search-bar v-model="inputSearch"/>

      <div class="text-lg text-gray-600">
        <span v-if="inputSearch">Searching <span class="font-bold">"{{ inputSearch }}"</span>.</span>
        Found {{ rows.length }} deals.
      </div>

      <app-table
          v-if="rows.length"
          :columns="columns"
          :rows="rows"
      />
    </div>
  </layout-app>
</template>

<script lang="ts" setup>
import {searchOnEveryRow} from "./search-on-every-row";
import {getAllModels, Model} from './api';
import {Column, Row} from "./Table/types";

const columns: Column[] = [
  {key: 'deal', label: 'Deal'},
  {key: 'issuer', label: 'Issuer'},
  {key: 'industry', label: 'Industry'},
  {key: 'access', label: 'Access'},
  {key: 'agent', label: 'Agent'},
  {key: 'source', label: 'Source'},
  {key: 'status', label: 'Dataroom Status'},
  {key: 'type', label: 'Type'},
];

const allRows: Row[] = getAllModels().map((model: Model) => {
  return [
    {column: 'deal', value: model.row.DealName},
    {column: 'issuer', value: model.joins.Issuer.IssuerName},
    {column: 'industry', value: model.joins.Industry?.IndustryName || 'N/A'},
    {column: 'access', value: 'Public'},
    {column: 'agent', value: model.joins.Agent.CompanyName},
    {column: 'source', value: model.joins.Source.SourceName},
    {column: 'status', value: 'In Dataroom'},
    {column: 'type', value: model.joins.Type.TypeName},
  ];
});

const rows = computed(() => {
  const query = inputSearch.value;
  return searchOnEveryRow(query, allRows);
});

const inputSearch = ref('');
</script>