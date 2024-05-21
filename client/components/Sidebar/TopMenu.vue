<script setup>
const folderStore = useFolderStore();
</script>

<template>
  <div class="flex flex-row w-full py-1.5 border-b px-4 items-center dark:border-b-[#3f3f45] dark:text-zinc-200">
    <div class="basis-4/5 font-semibold">
      <p>My workspace</p>
    </div>
    <UiDropdownMenu>
      <UiDropdownMenuTrigger class="ml-auto">
        <IconsPlusIcon />
      </UiDropdownMenuTrigger>
      <UiDropdownMenuContent class="w-52 bg-zinc-100 border-zinc-300 dark:bg-zinc-800 dark:border-[#3f3f45]">
        <UiDropdownMenuItem @click.stop="folderStore.createFile('0', folderStore.dir, 0)">
          <p>Создать файл</p>
          <iconsFilePlusIcon />
        </UiDropdownMenuItem>
        <UiDropdownMenuItem @click.stop="folderStore.createFolder('0', folderStore.dir, 0)">
          <p>Создать папку</p>
          <iconsFolderPlusIcon />
        </UiDropdownMenuItem>
      </UiDropdownMenuContent>
    </UiDropdownMenu>
  </div>
</template>

<style scoped>
p {
  margin-right: auto;
}
</style>