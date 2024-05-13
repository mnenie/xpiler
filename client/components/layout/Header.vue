<script setup lang="ts">
import { cn } from '~/lib/utils';
</script>

<template>
  <div :class="cn([$attrs.class, 'bg-blue-300'])" >
    header
  </div>
</template>
