<script setup>

const props = defineProps(["item"])

const hover = ref(false);

</script>

<template>

<div>
    <div @mouseenter="hover = true" @mouseleave="hover = false" class="flex flex-row  hover:bg-slate-300 px-3">
      <div class="flex flex-row space-x-2 items-center cursor-pointer basis-4/5">
        <iconsFolderIcon />
        <p>{{ props.item.name }}</p>  
      </div>
      <div v-if="hover" class="flex flex-row space-x-1 items-center">
        <iconsFilePlusIcon />
        <iconsFolderPlusIcon />
        <iconsTrashbin />
        <iconsPen />
      </div>
    </div>
    <div>
        <SidebarFolder v-if="props.item.folders.length > 0" v-for="folder in item.folders" :key="folder" :item="folder"/>
        <SidebarFile v-for="file in item.files" :key="file" :name="file" />
    </div>
</div>


</template>