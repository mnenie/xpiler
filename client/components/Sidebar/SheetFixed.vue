<script setup lang="ts">
const folderStore = useFolder();
const { dir } = storeToRefs(folderStore);

const modal = ref(false)
const updateModal = () => {
  modal.value = !modal.value
}
</script>

<template>
  <UiSheet @update:open="updateModal" :open="modal">
    <UiSheetTrigger>
      <slot />
    </UiSheetTrigger>
    <UiSheetContent :side="'left'" class="p-0 py-2 border-r border-r-zinc-300 w-full text-sm text-gray-600 dark:bg-zinc-800 dark:border-r-[#3f3f45]">
      <div
        class="relative"
      >
        <SidebarTopMenu />
        <SidebarExplorer
          v-if="dir.folders.length !== 0 || dir.files.length !== 0" @update-modal="updateModal"
        />
        <SidebarEmpty v-else />
      </div>
    </UiSheetContent>
  </UiSheet>
</template>
