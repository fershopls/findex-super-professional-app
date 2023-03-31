<template>
  <th
      class="text-left font-normal text-gray-500"
  >
    <div class="min-h-[65px] py-3 whitespace-nowrap px-3 flex items-center gap-2 cursor-pointer hover:text-sky-500 hover:border-sky-400 border-b" @click="open = !open">
      <sort-by-icon v-if="sortBy.key === column.key" :ascending="sortBy.ascending" class="text-sky-500"/>
      <div>
        <div class="text-xs uppercase tracking-widest">{{ column.label }}</div>
        <div v-if="checklist.length" class="text-yellow-600 text-xs">{{ checklist.length }} filters</div>
      </div>
    </div>

    <ui-popup
        :show="open"
        @hide="open = false"
    >
      <div class="text-xl text-center font-bold">
        Filter Industry
      </div>

      <div class="grid gap-2 grid-cols-2">
        <ui-button @click="onSortBy(true)">
          Sort A to Z
        </ui-button>

        <ui-button @click="onSortBy(false)">
          Sort Z to A
        </ui-button>
      </div>

      <app-checklist
          v-if="column.filterItems"
          :model-value="checklist"
          @update:modelValue="$emit('update:checklist', $event)"
          :models="column.filterItems"
      />

      <div class="grid grid-cols-2 gap-4" v-if="column.filterItems">
        <ui-button v-if="checklist.length" @click="$emit('update:checklist', [])">Clear {{ checklist.length }}
          filters
        </ui-button>
        <div v-else></div>
        <ui-button  @click="open = false">Close</ui-button>
      </div>
    </ui-popup>
  </th>
</template>

<script lang="ts" setup>
import {Column as ColumnType, SortBy as SortByType} from "./types";
import SortByIcon from './SortByIcon.vue';

const props = defineProps<{
  column: ColumnType;
  checklist: (string|number)[];
  sortBy: SortByType;
}>();

const emit = defineEmits<{
  (event: 'update:checklist', value: string[]): void;
  (event: 'update:sortBy', ascending: boolean): void;
}>();

const open = ref(false);

function onSortBy(ascending: boolean) {
  emit('update:sortBy', ascending);
  open.value = false;
}
</script>