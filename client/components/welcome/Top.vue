<script setup lang="ts">
import { CodeXml } from "lucide-vue-next";
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-[#e4e4e766]/40 bg-[#fff9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#fff9]/60 dark:bg-transparent dark:border-zinc-800"
  >
    <div class="flex h-12 items-center justify-between px-20">
      <div class="flex items-center space-x-3 cursor-pointer">
        <CodeXml :size="20" color="rgb(24 24 27)" />
        <span class="text-[22px] font-bold dark:text-zinc-100">Compiler</span>
      </div>
      <div class="flex items-center space-x-3">
        <UiButton size="sm" variant="ghost" @click="navigateTo(COMPILER_ABOUT_ROUTE)"
          >Log in</UiButton
        >
        <UiButton size="sm" @click="navigateTo(COMPILER_ABOUT_ROUTE)">
          Go to Compiler
        </UiButton>
      </div>
    </div>
  </header>
</template>
