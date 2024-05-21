<script setup lang="ts">
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

const emit = defineEmits<{
  (e: "updateModal"): void;
}>();

const folderStore = useFolder();
</script>

<template>
  <ContextMenu>
    <ContextMenuTrigger>
      <div class="pb-[50%]">
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
          @update-modal="emit('updateModal')"
        />
      </div>
    </ContextMenuTrigger>
    <ContextMenuContent
      class="w-72 bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-[#3f3f45]"
    >
      <ContextMenuItem
        @click.stop="folderStore.createFile('0', folderStore.dir, 0)"
      >
        <p>Создать файл</p>
        <iconsFilePlusIcon />
      </ContextMenuItem>
      <ContextMenuItem
        @click.stop="folderStore.createFolder('0', folderStore.dir, 0)"
      >
        <p>Создать папку</p>
        <iconsFolderPlusIcon />
      </ContextMenuItem>
    </ContextMenuContent>
  </ContextMenu>
</template>

<style scoped>
p {
  margin-right: auto;
}
</style>
