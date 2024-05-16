<script setup>
const props = defineProps({
  extension: String,
});
</script>

<template>
  <iconsExtensionTypescript v-if="props.extension == 'ts'"/>
  <iconsExtensionJavascript v-else-if="props.extension == 'js'"/>
  <IconsExtensionCPlusPlus v-else-if="props.extension == 'cpp'" />
  <IconsExtensionCSS v-else-if="props.extension == 'css'" />
  <IconsExtensionHTML v-else-if="props.extension == 'html'" />
  <iconsExtensionJSON v-else-if="props.extension == 'json'" />
  <IconsExtensionPython v-else-if="props.extension == 'py'" />

  <!-- default icon -->
  <svg
    v-else
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linecap="round"
    stroke-linejoin="round"
    class="lucide lucide-code"
  >
    <polyline points="16 18 22 12 16 6" />
    <polyline points="8 6 2 12 8 18" />
  </svg>
</template>

<style scoped>
svg {
  width: 11px;
  height: 11px;
  @apply dark:text-zinc-100
}
</style>
