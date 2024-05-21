<script setup lang="ts">
import { cn } from "~/lib/utils";
import {
  ListTree,
  MessagesSquare,
  SquareTerminal,
  Bot,
  PenLine,
} from "lucide-vue-next";
import { useWindowSize } from "@vueuse/core";

const { symbols, extension } = storeToRefs(useEditorStore());
const { width, height } = useWindowSize();

const isNoteVisible = ref(false);
const toggleNote = () => {
  isNoteVisible.value = !isNoteVisible.value;
};
</script>

<template>
  <div
    :class="
      cn([
        $attrs.class,
        'h-8 w-full flex items-center justify-between bg-zinc-200 border-t-zinc-300 px-4 dark:bg-[#222224] dark:border-t-[#3f3f45] dark:text-zinc-200',
      ])
    "
  >
    <div class="flex items-center gap-4 text-zinc-500 dark:text-zinc-500">
      <SidebarSheetFixed v-if="width < 520">
        <ListTree class="cursor-pointer" :size="16" />
      </SidebarSheetFixed>
      <ListTree v-else class="cursor-pointer" :size="16" />
      <MessagesSquare class="mt-[2.5px] cursor-pointer" :size="16" />
    </div>
    <div class="flex items-center gap-4">
      <div class="flex items-center gap-4">
        <div
          v-show="width >= 520"
          class="flex items-center gap-2 text-xs font-medium mr-2"
        >
          <span class="">👉 Press </span>
          <UiBadge variant="secondary">alt + q</UiBadge>
          <span>for AI auto-completions</span>
        </div>
        <span class="text-xs">
          Symbols: {{ symbols ? symbols.split("").length : 0 }}
        </span>
        <span class="text-xs">{{
          extension === "ts" ? "TypeScript" : "JavaScript"
        }}</span>
      </div>
      <div class="flex items-center gap-3">
        <PenLine
          @click="toggleNote"
          :class="
            cn('cursor-pointer', [
              isNoteVisible
                ? 'text-blue-500 dark:text-blue-300'
                : 'text-zinc-500 dark:text-zinc-500',
            ])
          "
          :size="15"
        />
        <BotChat>
          <Bot
            class="cursor-pointer text-zinc-500 dark:text-zinc-500"
            :size="15"
          />
        </BotChat>
        <SquareTerminal
          class="cursor-pointer text-blue-500 dark:text-blue-300"
          :size="15"
        />
      </div>
    </div>
    <NoteContainer v-show="isNoteVisible" />
  </div>
</template>
