<script setup lang="ts">
import { useColorMode } from "@vueuse/core";
import { redirect } from "~/helpers/helperRedirect";
import { GithubIcon } from "lucide-vue-next";

const mode = useColorMode();
</script>

<template>
  <section
    class="mx-auto flex items-center gap-8 py-8 md:py-12 md:pb-8 lg:py-32 overflow-hidden"
  >
    <div class="pl-20 pr-20 max-w-[800px] w-full flex flex-col gap-2 z-50 relative">
      <h1
        class="mb-1 text-3xl font-bold leading-tight tracking-tighter dark:text-zinc-100 md:text-6xl lg:leading-[1.1]"
      >
        Code your thoughts with modern Xpiler
      </h1>
      <p class="text-lg text-[#72717a] dark:text-zinc-400 sm:text-xl">
        Сode, enjoy, chat in our code editor. Share your thoughts and asking
        some info in aour build-in AI. Xpiler will be glad to help you!
      </p>
      <div class="flex w-full space-x-4 py-4 md:pb-10">
        <UiButton
          class="w-full gap-3"
          @click="navigateTo(COMPILER_ABOUT_ROUTE)"
        >
          Go to Xpiler
        </UiButton>
        <UiButton
          @click="redirect('https://github.com/mnenie/xpiler')"
          variant="outline"
          class="w-full"
        >
          <img v-if="mode === 'light'" src="/github.png" class="mr-2 h-4 w-4" />
          <GithubIcon v-else class="mr-2 h-4 w-4" />
          GitHub
        </UiButton>
      </div>
    </div>
    <img
      class="rounded-[0.5rem] border shadow dark:border-zinc-600 w-1/2 z-50 relative mr-10"
      src="/xpiler.png"
    />
    <IconsSquareLight v-if="mode === 'light'" />
    <IconsSquareDark v-else/>
  </section>
</template>
