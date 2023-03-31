<template>
  <div class="grid gap-1">
    <input ref="elementInputSearch" v-model="inputSearch" type="text" class="outline-0 ring-0 border px-2 py-3 rounded" placeholder="Filter">

    <div class="text-gray-500 text-right">
      {{ modelValue.length }} of {{ models.length }} selected
    </div>

    <div class="grid max-h-[50vh] overflow-y-auto custom-scroll">
      <div
        v-for="model in filter(inputSearch, models)" :key="model.key"
        class="flex items-center gap-2 py-3 group cursor-pointer hover:text-sky-500"
        @click="onSelect(model.key)"
      >
        <div class="w-5 h-5 border rounded text-white flex items-center justify-center"
             :class="isSelected(model.key) ? 'bg-green-500 border-green-300' : 'border-gray-300'"
        >
          <template v-if="isSelected(model.key)">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </template>
        </div>
        {{ model.value }}
      </div>
    </div>
  </div>
</template>

<style>
.custom-scroll::-webkit-scrollbar {
  width: 10px;
}

.custom-scroll::-webkit-scrollbar-track {
  @apply bg-gray-300 rounded;
}

.custom-scroll::-webkit-scrollbar-thumb {
  @apply bg-blue-400 rounded-lg;
}
</style>

<script lang="ts" setup>
import {onMounted} from "vue";

interface Model {
  key: string|number;
  value: string;
}

const props = defineProps<{
  models: Model[];
  modelValue: (string|number)[];
  autofocus?: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', value: (string|number)[]): void;
}>();

const elementInputSearch = ref<HTMLInputElement|null>(null);
const inputSearch = ref('');

// Auto focus on input
onMounted(() => props.autofocus && elementInputSearch.value?.focus());

function onSelect(key: string|number) {
  // Toggle if already selected
  if (props.modelValue.includes(key)) {
    emit('update:modelValue', props.modelValue.filter(k => k !== key));
  } else {
    emit('update:modelValue', [...props.modelValue, key]);
  }
}

function isSelected(key: string|number) {
  return props.modelValue.includes(key);
}

function filter(query: string, models: Model[]) {
  if (!query) {
    return models;
  }
  // Filter all the models in checklist by user input
  return models.filter(model => model.value.toLowerCase().includes(query.toLowerCase()));
}
</script>