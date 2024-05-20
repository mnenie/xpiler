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
  (e: "onTesting"): void;
}>();
</script>

<template>
  <ul
    class="flex w-full border-b bg-zinc-200/40 border-zinc-300 dark:bg-zinc-800 dark:border-[#3f3f45]"
  >
    <div
      v-for="file in activeTabs"
      :key="file.id"
      @click="emits('switchTab', file)"
      :class="
        cn(
          'list-none, text-gray-900 text-[13px] md:text-[13px] 2xl:text-[14px] flex items-center gap-2 h-8 px-3 border-r border-zinc-300 cursor-pointer dark:text-zinc-200 dark:border-[#3f3f45]',
          [
            $route.params.id === file.id
              ? 'bg-white dark:bg-[#2a2a30]'
              : 'bg-zinc-100 dark:bg-[#222224]',
          ]
        )
      "
    >
      {{ file.name }}.{{ file.extension }}
      <Play
        @click.stop="emits('compileCode')"
        :size="12"
        color="rgb(5 150 105)"
      />
    </div>
  </ul>
</template>
