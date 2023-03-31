<template>
  <Transition>
    <div class="fixed inset-0" v-if="show">
      <div v-if="show" class="absolute inset-0 bg-gray-600/90"></div>
      <div class="absolute inset-0 py-8 px-3 overflow-y-auto" @click.self="hide()">
        <div class="bg-white mx-auto rounded-xl max-w-xl p-3 grid gap-4">
          <slot></slot>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.15s linear, transform 0.3s ease-out;
}

.v-enter-from {
  opacity: 0;
  transform: translateX(10px);
}

.v-leave-to {
  opacity: 0;
  transform: translateX(-10px);
}
</style>

<script lang="ts" setup>
import { useBodyScrollFreeze, useEscKey } from "@/support";

const props = defineProps<{
  show?: boolean;
}>();

const emit = defineEmits<{
  (event: 'hide'): void;
}>();

// Use composable to freeze the body scroll
const { freeze, unfreeze } = useBodyScrollFreeze();

// When the popup is shown, freeze the body scroll
watch(() => props.show, (show) => show ? freeze() : unfreeze());

// Hide on ESC key
useEscKey(() => props.show && hide());

function hide() {
  emit('hide');
}
</script>