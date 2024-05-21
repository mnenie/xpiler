<script setup lang="ts">
import { useWindowSize } from "@vueuse/core";

const folderStore = useFolderStore();
const { getFile, getFiles, postFile, delFile } = useFolder();

const { dir } = storeToRefs(folderStore);
const { width } = useWindowSize();

</script>

<template>
  <div v-if="width >=520"
    class="bg-zinc-100/60 border-r border-r-zinc-300 w-72 text-sm text-gray-600 dark:bg-zinc-800 dark:border-r-[#3f3f45] relative"
  >
    <SidebarTopMenu />
    <SidebarExplorer
      v-if="dir.folders.length !== 0 || dir.files.length !== 0"
    />
    <SidebarEmpty v-else />
  </div>
</template>
