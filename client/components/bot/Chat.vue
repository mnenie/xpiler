<script setup lang="ts">
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
</script>

<template>
  <Sheet>
    <SheetTrigger>
      <slot />
    </SheetTrigger>
    <SheetContent class="h-full flex flex-col justify-between">
      <UiSheetHeader>
        <UiSheetTitle> Ai CodeMind </UiSheetTitle>
      </UiSheetHeader>
      <BotMessage />
    </SheetContent>
  </Sheet>
</template>
