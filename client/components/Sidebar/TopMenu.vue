<script setup>

const folderStore = useFolder();

</script>

<template>

<div class="flex flex-row w-full py-1.5 border-b px-4 items-center">
    <div class="basis-4/5 font-semibold">
        <p>My workspace</p>
    </div>
    <div class="flex flex-row space-x-1">
        <iconsFilePlusIcon @click="folderStore.createFile('0', folderStore.dir, 0)" />
        <iconsFolderPlusIcon @click="folderStore.createFolder('0', folderStore.dir, 0)" />
    </div>
</div>

</template>