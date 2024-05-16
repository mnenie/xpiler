<script setup lang="ts">
import { ArrowBigUpDash } from "lucide-vue-next";

const emits = defineEmits<{
  (e: 'onSubmit'): void;
}>();
const message = defineModel<string>()
</script>

<template>
  <div class="sticky bottom-0 z-50 flex w-full flex-col items-center justify-end">
    <form @submit.prevent="emits('onSubmit')" class="relative w-full">
      <UiInput v-model="message" :placeholder="'Message AI'" class="h-8" />
      <UiButton
        type="submit"
        variant="ghost"
        class="absolute right-[4px] top-1/2 h-6 -translate-y-1/2 px-2"
      >
        <ArrowBigUpDash :color="'rgb(82 82 91 / 0.9)'" :size="20" />
      </UiButton>
    </form>
    <span class="py-1 text-xs text-zinc-400"> Write to our AI what you want to know </span>
  </div>
</template>
