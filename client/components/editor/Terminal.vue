<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { SquareTerminal, CheckCheck } from "lucide-vue-next";

const props = defineProps<{
  output: string;
  isPending: boolean;
}>();

const mode = useColorMode();
</script>

<template #terminal>
  <div class="w-full">
    <div
      class="relative h-52 bg-white w-full owflow-hidden dark:bg-[#2a2a30] dark:text-zinc-200"
    >
      <div class="flex w-full bg-zinc-100/60 border-t border-zinc-300 dark:bg-zinc-800 dark:border-[#3f3f45]">
        <div
          class="flex items-center gap-2 px-4 py-0.5 bg-white border-r border-zinc-300 dark:border-[#3f3f45] text-[13px] font-medium dark:bg-[#2a2a30]"
        >
          <SquareTerminal
            class="cursor-pointer text-slate-50"
            :color="mode === 'dark' ? 'rgb(228 228 231)' : 'rgb(9 9 11)'"
            :size="14"
          />
          Terminal
        </div>
      </div>
      <div class="p-4 flex flex-col gap-4">
        <span class="font-medium text-sm"
          >Last login: Mon May 13 22:26:30 on ttys001</span
        >
        <div
          v-if="output && !isPending"
          class="flex flex-col gap-1 overflow-auto h-32"
        >
          <span :class="'text-green-700 text-sm'">Compiler 0.0.1</span>
          <div class="flex items-center gap-2">
            <CheckCheck
              class="cursor-pointer text-slate-50"
              color="rgb(161 161 170)"
              :size="11"
            />
            <span class="text-sm">{{ output }}</span>
          </div>
        </div>
        <div v-if="isPending" class="flex items-center gap-2">
          <span class="text-sm">Compiler is thinking</span>
          <div
            class="inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-zinc-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>
