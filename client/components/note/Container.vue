<script setup lang="ts">
import { Textarea } from "@/components/ui/textarea";

const textarea = ref<HTMLElement>();

watchEffect(() => {
  if (document) {
    textarea.value = document.getElementById("textarea")!;
    textarea.value.focus();
  }
});
</script>

<template>
  <div
    class="w-96 h-96 z-[9999] fixed bottom-10 right-7 dark:bg-zinc-800 bg-zinc-100 rounded-md"
  >
    <Textarea
      ref="textarea"
      id="textarea"
      class="h-full w-full resize-none"
    />
  </div>
</template>
