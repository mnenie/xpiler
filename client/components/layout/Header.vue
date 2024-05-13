<script setup lang="ts">
import { cn } from "~/lib/utils";
import { ChevronDown, Link } from "lucide-vue-next";
import { Button } from "@/components/ui/button";
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
    <div>
      <span class="text-sm font-medium">Compiler</span>
    </div>
    <div class="gap-3 flex items-center">
      <Button
        size="sm"
        variant="outline"
        class="flex h-full items-center border-dashed gap-2"
      >
        <Link color="rgb(107 114 128)" :size="14" />
        <span class="text-sm">Share</span>
      </Button>
      <div class="gap-1 flex items-center">
        <UiAvatar class="h-6 w-6 cursor-pointer">
          <UiAvatarImage
            class="object-cover"
            src="https://www.shadcn-vue.com/avatars/02.png"
          />
          <UiAvatarFallback> al </UiAvatarFallback>
        </UiAvatar>
        <ChevronDown color="rgb(107 114 128)" :size="14" />
      </div>
    </div>
  </div>
</template>
