<script setup lang="ts">
import { redirect } from "~/helpers/helperRedirect";
</script>

<template>
  <div class="flex flex-col px-3 py-6 gap-8">
    <div class="flex flex-col w-full">
      <span class="text-sm dark:text-zinc-200 mb-4 text-zinc-800">
        Создайте папку или файл чтобы начать работу.
      </span>
    </div>
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
    <div class="absolute bottom-20 pr-6 left-14">
      <span class="text-sm dark:text-zinc-200 mb-4 text-zinc-800">
        Терминал, ИИ, Блокнот и многое другое ...
      </span>
      <img src="/arrow.png" class="w-36 ml-14 mt-2" />
    </div>
  </div>
</template>
