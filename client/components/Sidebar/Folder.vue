<script setup>

const folderStore = useFolder();

const props = defineProps(["item"])
const hover = ref(false);

const identStyle = reactive({
  marginLeft: `${props.item.layer * 5 + 5}px`
})

</script>

<template>

<div>
    <div @mouseenter="hover = true" @mouseleave="hover = false" :style="identStyle" class="flex flex-row hover:bg-slate-300 px-3">
      <div class="flex flex-row space-x-2 items-center cursor-pointer basis-4/5">
        <iconsFolderIcon />
        <!-- debug outputs -->
        <p>{{ props.item.name }}</p> 
      </div>
      <div v-if="hover" class="flex flex-row space-x-1 items-center">
        <iconsFilePlusIcon @click="folderStore.createFile(props.item.id, props.item, props.item.layer + 1)" />
        <iconsFolderPlusIcon @click="folderStore.createFolder(props.item.id, props.item, props.item.layer + 1)" />
        <iconsTrashbin @click="folderStore.deleteFolder(props.item.id, folderStore.dir)" />
        <iconsPen />
      </div>
    </div>
    <div>
        <SidebarFolder v-if="props.item.folders.length > 0" v-for="folder in item.folders" :key="folder" :item="folder"/>
        <SidebarFile v-for="file in item.files" :key="file.id" :item="file" :layer="props.item.layer + 1" />
    </div>
</div>


</template>