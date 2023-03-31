<template>
  <th
      class="py-3 text-left px-3 font-normal text-gray-500 hover:bg-blue-100 cursor-pointer"
      @click="open = !open"
  >
    <div class="flex items-center gap-2">
      <sort-by-icon v-if="sortBy.key === column.key" :ascending="sortBy.ascending" />
      <div class="text-xs uppercase tracking-widest">{{ column.label }}</div>
    </div>
    <div v-if="checklist.length" class="text-yellow-600 text-xs">{{ checklist.length }} filters</div>
  </th>

  <template v-if="open">
    <div class="fixed inset-0">
      <div class="absolute inset-0 bg-gray-800/80 backdrop-blur"></div>
      <div class="absolute inset-0 py-8 px-3 overflow-y-auto" @click.self="open = false">
        <div class="bg-white mx-auto rounded max-w-xl p-3 grid gap-4">
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

          <div class="grid grid-cols-2 gap-4">
            <ui-button v-if="checklist.length" @click="$emit('update:checklist', [])">Clear {{ checklist.length }}
              filters
            </ui-button>
            <div v-else></div>
            <ui-button @click="open = false">Close</ui-button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import {Column as ColumnType, SortBy as SortByType} from "./types";
import SortByIcon from './SortByIcon.vue';

const props = defineProps<{
  column: ColumnType;
  checklist: string[];
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