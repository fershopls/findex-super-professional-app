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
          :columns="columns"
          :rows="rows"
      />
    </div>
  </layout-app>
</template>

<script lang="ts" setup>
import {searchOnEveryRow} from "./search-on-every-row";
import {dataset, getAllModels, Model} from './api';
import {Column, Row} from "./Table/types";

const columns: Column[] = [
  {key: 'deal', label: 'Deal'},
  {
    key: 'issuer', label: 'Issuer',
    filterItems: dataset.ClientIssuers.map(x => ({key: x.IssuerId, value: x.IssuerName}))
  },
  {
    key: 'industry', label: 'Industry',
    filterItems: dataset.Industries.map(x => ({key: x.Id, value: x.IndustryName}))
  },
  {key: 'access', label: 'Access'},
  {
    key: 'agent', label: 'Agent',
    filterItems: dataset.Agents.map(x => ({key: x.Id, value: x.CompanyName}))
  },
  {
    key: 'source', label: 'Source',
    filterItems: dataset.Sources.map(x => ({key: x.Id, value: x.SourceName}))
  },
  {key: 'status', label: 'Dataroom Status'},
  {
    key: 'type', label: 'Type',
    filterItems: dataset.DealTypes.map(x => ({key: x.Id, value: x.TypeName}))
  },
];

const allRows: Row[] = getAllModels().map((model: Model) => {
  return [
    {column: 'deal', value: model.row.DealName},
    {column: 'issuer', value: model.joins.Issuer.IssuerName, columnId: model.joins.Issuer.IssuerId},
    {column: 'industry', value: model.joins.Industry?.IndustryName || 'N/A', columnId: model.joins.Industry?.Id},
    {column: 'access', value: 'Public'},
    {column: 'agent', value: model.joins.Agent.CompanyName, columnId: model.joins.Agent.Id},
    {
      column: 'source', value: model.joins.Source.SourceName,
      columnId: model.joins.Source.Id,
    },
    {column: 'status', value: 'In Dataroom'},
    {
      column: 'type', value: model.joins.Type.TypeName,
      columnId: model.joins.Type.Id,
    },
  ];
});

const rows = computed(() => {
  const query = inputSearch.value;
  return searchOnEveryRow(query, allRows);
});

const inputSearch = ref('');
</script>