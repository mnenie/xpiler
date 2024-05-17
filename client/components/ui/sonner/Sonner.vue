<script lang="ts" setup>
import { Toaster as Sonner, type ToasterProps } from 'vue-sonner'

const props = defineProps<ToasterProps>()
</script>

<template>
  <Sonner
    class="toaster group"
    v-bind="props"
    :toast-options="{
      classes: {
        toast: 'group toast group-[.toaster]:bg-white group-[.toaster]:text-zinc-950 group-[.toaster]:border-zinc-200 group-[.toaster]:shadow-lg dark:group-[.toaster]:bg-zinc-800 dark:group-[.toaster]:text-zinc-50 dark:group-[.toaster]:border-zinc-800 md:group-[.toaster]:text-[12px] 2xl:group-[.toaster]:text-sm',
        description: 'group-[.toast]:text-zinc-500 dark:group-[.toast]:text-zinc-400',
        actionButton:
          'group-[.toast]:bg-gray-900 group-[.toast]:text-gray-50 dark:group-[.toast]:bg-gray-50 dark:group-[.toast]:text-gray-900',
        cancelButton:
          'group-[.toast]:bg-gray-100 group-[.toast]:text-gray-500 dark:group-[.toast]:bg-gray-800 dark:group-[.toast]:text-gray-400',
      },
    }"
  />
</template>
