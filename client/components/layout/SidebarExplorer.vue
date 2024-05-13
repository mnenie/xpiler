<script setup>

const folderStore = useFolder();


</script>

<template>

<div class="bg-gray-100 border w-60 text-sm text-gray-500">
    <SidebarTopMenu />
    <SidebarFolder v-for="folder in folderStore.dir.folders" :key="folder.id" :item="folder" />
    <SidebarFile v-for="file in folderStore.dir.files" :key="file.id" :item="file" :layer="0"/>
</div>

</template>
