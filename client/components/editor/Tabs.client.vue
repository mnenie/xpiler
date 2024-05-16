<script setup lang="ts">
import type { IFile } from "~/types/folder.interface";
import { cn } from "~/lib/utils";
import { Play } from "lucide-vue-next";

const props = defineProps<{
  activeTabs: IFile[];
  activeFile: IFile | undefined;
}>();

const emits = defineEmits<{
  (e: "switchTab", file: IFile): void;
  (e: "compileCode"): void;
}>();
</script>

<template #tabs>
  <ul class="flex w-full border-b bg-zinc-200/40 border-zinc-300">
    <NuxtLink
      v-for="file in activeTabs"
      :key="file.id"
      @click="emits('switchTab', file)"
      :class="
        cn(
          'list-none, text-gray-900 text-[13px] md:text-[13px] 2xl:text-[14px] flex items-center gap-2 h-8 px-3 border-r border-zinc-300 cursor-pointer',
          [$route.params.id === file.id ? 'bg-white' : 'bg-zinc-100']
        )
      "
    >
      {{ file.name }}.{{ file.extension }}
      <Play @click="emits('compileCode')" :size="12" color="rgb(5 150 105)" />
    </NuxtLink>
  </ul>
</template>
