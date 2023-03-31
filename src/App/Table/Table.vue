<template>
  <div class="overflow-x-auto bg-white rounded">
    <table class="w-full">
      <thead class="border-b">
      <tr>
        <th v-for="column in columns" :key="column.key"
            class="py-3 text-left px-3 font-normal text-xs uppercase tracking-widest text-gray-500 hover:bg-blue-100 cursor-pointer"
        >
          <div class="flex items-center gap-1">
            <template v-if="0">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
              </svg>
            </template>

            {{ column.label }}
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in rows" :key="row.id" class="even:bg-gray-100">
        <td v-for="column in columns" :key="column.key" class="px-4 py-3 text-sm">
          {{ row.find(r => r.column === column.key)?.value }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  columns: { key: string; label: string }[];
  rows: { id: number; column: string; value: string }[];
}>();

// const sortBy = ref('');
//
// function onSortBy(column) {
//   sortBy.value = column;
// }
//
// function isSortedBy(column) {
//   return sortBy.value === column;
// }
</script>