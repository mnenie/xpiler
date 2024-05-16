<script setup lang="ts">
import { redirect } from "~/helpers/helperRedirect";
</script>

<template>
  <section
    class="mx-auto flex items-center gap-2 py-20 md:py-32 lg:py-[140px] px-20"
  >
    <div class="max-w-[800px] flex flex-col items-center justify-center gap-2">
      <h1
        class="mb-1 text-center text-3xl font-bold leading-tight tracking-tighter dark:text-zinc-100 md:text-6xl lg:leading-[1.1]"
      >
        Code your thoughts with Compiler
      </h1>
      <p
        class="max-w-[600px] text-center text-lg text-[#72717a] dark:text-zinc-400 sm:text-xl"
      >
        Сode, enjoy, chat in our code editor. Share your thoughts and train your
        algorithms. Compiler will be glad to help you!
      </p>
      <div
        class="flex w-full items-center justify-center space-x-4 py-4 md:pb-10"
      >
        <UiButton @click="navigateTo(COMPILER_ABOUT_ROUTE)"
          >Go to Compiler</UiButton
        >
        <UiButton
          @click="redirect('https://github.com/mnenie/Notium')"
          variant="outline"
        >
          <img src="/github.png" class="mr-2 h-4 w-4" />
          GitHub
        </UiButton>
      </div>
    </div>
    <img
      class="rounded-[0.5rem] border shadow dark:border-zinc-600 w-1/2"
      src="/mac.png"
    />
  </section>
</template>
