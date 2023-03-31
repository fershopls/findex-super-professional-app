<template>
  <th
      class="py-3 text-left px-3 font-normal text-gray-500 hover:bg-blue-100 cursor-pointer"
      @click="open = !open"
  >
    <span class="text-xs uppercase tracking-widest">{{ column.label }}</span>
    <span v-if="checklist.length" class="ml-2 text-yellow-600 text-xs">(Filtered)</span>
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
            <ui-button class="">
              Sort A to Z
            </ui-button>

            <ui-button class="">
              Sort Z to A
            </ui-button>
          </div>

          <app-checklist
              v-if="column.filterItems"
              :model-value="checklist"
              @update:modelValue="$emit('update:checklist', $event)"
              :models="column.filterItems"
          />

          <div class="grid">
            <ui-button @click="open = false">Close</ui-button>
          </div>
        </div>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import {Column as ColumnType} from "./types";

const props = defineProps<{
  column: ColumnType;
  checklist: string[];
}>();

const emit = defineEmits<{
    (event: 'update:checklist', value: string[]): void;
}>();

const open = ref(false);
const inputChecklist = ref<string[]>([]);
</script>