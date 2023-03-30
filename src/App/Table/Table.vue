<template>
  <div class="overflow-x-auto bg-white rounded">
    <table class="w-full">
      <thead class="border-b">
      <tr>
        <th v-for="column in columns" :key="column"
            class="py-3 text-left px-3 font-normal text-sm text-gray-500 hover:bg-blue-100 cursor-pointer"
            @click="onSortBy(column)"
        >
          <div class="flex items-center gap-1">
            <template v-if="isSortedBy(column)">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor" class="w-4 h-4">
                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5"/>
              </svg>
            </template>

            {{ column }}
          </div>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in props.rows" :key="row.id">
        <td v-for="column in columns" :key="column" class="px-4">
          {{ row[column] }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  rows: any[];
}>();

const columns = computed(() => Object.keys(props.rows[0]));
const sortBy = ref('');

function onSortBy(column) {
  sortBy.value = column;
}

function isSortedBy(column) {
  return sortBy.value === column;
}
</script>