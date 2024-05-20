<script setup lang="ts">
import { redirect } from "~/helpers/helperRedirect";
import { Braces } from "lucide-vue-next";
</script>

<template>
  <header
    class="sticky top-0 z-50 w-full border-b border-[#e4e4e766]/40 bg-[#fff9]/95 backdrop-blur supports-[backdrop-filter]:bg-[#fff9]/60 dark:bg-transparent dark:border-zinc-700"
  >
    <div class="flex h-12 items-center justify-between px-10 pl-20 header">
      <div
        class="flex items-center space-x-2 cursor-pointer dark:text-zinc-100 text-zinc-900"
      >
        <Braces :size="22" />
        <span class="text-[22px] font-bold dark:text-zinc-100">Xpiler</span>
      </div>
      <div class="flex items-center space-x-3">
        <UiButton
          size="sm"
          variant="ghost"
          @click="redirect('https://github.com/mnenie/xpiler')"
        >
          About
        </UiButton>
        <UiButton
          size="sm"
          variant="ghost"
          @click="redirect('https://github.com/mnenie/xpiler')"
        >
          Docs
        </UiButton>
        <UiButton size="sm" @click="navigateTo(COMPILER_ABOUT_ROUTE)">
          Go to Xpiler
        </UiButton>
      </div>
    </div>
  </header>
</template>

<style scoped>
@media screen and (max-width: 1200px) {
  .header {
    padding: 0 40px;
  }
}

@media screen and (max-width: 586px) {
  .header {
    padding: 0 20px;
  }
  .header span{
    font-size: 18px;
  }
  .header button{
    font-size: 12px;
  }
}
</style>
