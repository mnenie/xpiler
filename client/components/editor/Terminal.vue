<script setup lang="ts">
import { SquareTerminal, CheckCheck } from "lucide-vue-next";

const props = defineProps<{
  output: string;
  isPending: boolean;
}>();
</script>

<template>
  <div class="w-full">
    <div
      class="relative h-52 bg-white w-full owflow-hidden"
    >
      <div class="flex w-full bg-zinc-100/60 border-t border-zinc-300">
        <div
          class="flex items-center gap-2 px-4 py-0.5 bg-white border-r border-zinc-300 text-[13px] font-medium"
        >
          <SquareTerminal
            class="cursor-pointer text-slate-50"
            color="rgb(9 9 11)"
            :size="14"
          />
          Terminal
        </div>
      </div>
      <div class="p-4 flex flex-col gap-4">
        <span class="font-medium"
          >Last login: Mon May 13 22:26:30 on ttys001</span
        >
        <div
          v-if="output && !isPending"
          class="flex flex-col gap-1 overflow-auto h-32"
        >
          <span :class="'text-green-700'">Compiler 0.0.1</span>
          <div class="flex items-center gap-2">
            <CheckCheck
              class="cursor-pointer text-slate-50"
              color="rgb(161 161 170)"
              :size="11"
            />
            <span>{{ output }}</span>
          </div>
        </div>
        <div v-if="isPending" class="flex items-center gap-2">
          <span>Compiler is thinking</span>
          <div
            class="inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-zinc-400"
          />
        </div>
      </div>
    </div>
  </div>
</template>
