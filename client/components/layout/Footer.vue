<script setup lang="ts">
import { cn } from "~/lib/utils";
import { ListTree, MessagesSquare, SquareTerminal, Bot } from "lucide-vue-next";
</script>

<template>
  <div
    :class="
      cn([
        $attrs.class,
        'h-8 w-full flex items-center justify-between bg-gray-50 border border-b-gray-100 px-4',
      ])
    "
  >
    <div class="flex items-center gap-4">
      <ListTree class="cursor-pointer" color="rgb(107 114 128)" :size="16" />
      <MessagesSquare
        class="mt-[2.5px] cursor-pointer"
        color="rgb(107 114 128)"
        :size="16"
      />
    </div>
    <div class="flex items-center gap-6">
      <div class="flex items-center gap-4">
        <span class="text-xs">String: 20</span>
        <span class="text-xs font-medium">TypeScript</span>
      </div>
      <div class="flex items-center gap-3">
        <BotChat>
          <Bot class="cursor-pointer" color="rgb(107 114 128)" :size="15" />
        </BotChat>
        <SquareTerminal
          class="cursor-pointer"
          color="rgb(107 114 128)"
          :size="15"
        />
      </div>
    </div>
  </div>
</template>
