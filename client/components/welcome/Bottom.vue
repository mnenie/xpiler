<script setup lang="ts">
import { redirect } from "~/helpers/helperRedirect";
</script>

<template>
  <footer
    class="border-t border-[#e4e4e766]/40 py-4 md:py-0 dark:bg-transparent absolute bottom-0 w-full"
  >
    <div
      class="px-20 flex flex-col items-center justify-between gap-4 md:h-20 md:flex-row footer"
    >
      <p
        class="text-balance text-center text-sm leading-loose text-zinc-950/60 md:text-left dark:text-zinc-200"
      >
        <span class="font-medium">Xpiler</span> - code compiler for your tasks.
        The source code is available on
        <a
          @click.prevent="redirect('https://github.com/mnenie/xpiler')"
          class="cursor-pointer font-medium underline underline-offset-4"
        >
          Github
        </a>
      </p>
    </div>
  </footer>
</template>

<style scoped>
@media screen and (max-width: 586px) {
  .footer {
    padding: 0 20px;
    align-items: flex-start;
  }
}
</style>
