<script setup>

const folderStore = useFolder();

const props = defineProps({
  item: Object,
  layer: Number
})

const identStyle = reactive({
  marginLeft: `${props.layer * 10 + 10}px`
})

const hover = ref(false);

</script>

<template>

<div @mouseenter="hover = true" @mouseleave="hover = false" :style="identStyle" class="flex flex-row my-2">
  <div class="flex flex-row basis-4/5 space-x-2 items-center cursor-pointer px-3">
    <iconsFileIcon :extension="props.item.extension" />
    <!-- debug outputs -->
    <p class="text-[13px] md:text-[13px] 2xl:text-[14px] font-medium">{{ props.item.name }}.{{ props.item.extension }}</p>
  </div>
  <div v-if="hover" class="flex flex-row space-x-1 items-center">
    <iconsTrashbin @click="folderStore.deleteFile(props.item.id, folderStore.dir)" />
    <iconsPen />
  </div>
</div>

</template>