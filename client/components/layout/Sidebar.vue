<script setup lang="ts">
const folderStore = useFolder();

const { dir } = storeToRefs(folderStore);
</script>

<template>
  <div
    class="bg-zinc-100/60 border-r border-r-zinc-300 w-72 text-sm text-gray-600 dark:bg-zinc-800 dark:border-r-[#3f3f45] relative"
  >
    <SidebarTopMenu />
    <SidebarExplorer
      v-if="dir.folders.length !== 0 || dir.files.length !== 0"
    />
    <SidebarEmpty v-else />
  </div>
</template>
