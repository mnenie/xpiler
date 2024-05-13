<script setup>

const props = defineProps({
  name: String
})

</script>

<template>

<div class="flex flex-row space-x-2 items-center cursor-pointer px-3">
  <iconsFileIcon />
  <p>{{ props.name }}</p>  
</div>

</template>