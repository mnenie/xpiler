<script setup>
const folderStore = useFolder();
</script>

<template>
  <div
    class="bg-zinc-100/60 border-r border-r-zinc-300 w-72 text-sm text-gray-600"
  >
    <SidebarTopMenu />
    <SidebarFolder
      v-for="folder in folderStore.dir.folders"
      :key="folder.id"
      :item="folder"
    />
    <SidebarFile
      v-for="file in folderStore.dir.files"
      :key="file.id"
      :item="file"
      :layer="0"
    />
  </div>
</template>
