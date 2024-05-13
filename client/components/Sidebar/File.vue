<script setup>

const folderStore = useFolder();

const props = defineProps({
  item: Object,
  layer: Number
})

const identStyle = reactive({
  marginLeft: `${props.layer * 5 + 5}px`
})

const hover = ref(false);

</script>

<template>

<div @mouseenter="hover = true" @mouseleave="hover = false" :style="identStyle" class="flex flex-row">
  <div class="flex flex-row basis-4/5 space-x-2 items-center cursor-pointer px-3">
    <iconsFileIcon />
    <!-- debug outputs -->
    <p>{{ props.item.name }}.{{ props.item.extension }}</p>
  </div>
  <div v-if="hover" class="flex flex-row space-x-1 items-center">
    <iconsTrashbin @click="folderStore.deleteFile(props.item.id, folderStore.dir)" />
    <iconsPen />
  </div>
</div>

</template>