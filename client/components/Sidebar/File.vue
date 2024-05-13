<script setup>

const props = defineProps({
  name: String
})

const hover = ref(false);

</script>

<template>

<div @mouseenter="hover = true" @mouseleave="hover = false" class="flex flex-row">
  <div class="flex flex-row basis-4/5 space-x-2 items-center cursor-pointer px-3">
    <iconsFileIcon />
    <p>{{ props.name }}</p>
  </div>
  <div v-if="hover" class="flex flex-row space-x-1 items-center">
    <iconsTrashbin />
    <iconsPen />
  </div>
</div>

</template>