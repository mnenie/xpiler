<script setup>

const f = {
    name: "test1",
    files: ["file1", "file2", "file3"],
    folders: [
        {
            name: "test11",
            files: ["file11", "file12", "file13"],
            folders: []
        },
        {
            name: "test12",
            files: ["file21", "file22", "file23"],
            folders: []
        }
    ]
}

const dir = ref(f);

</script>

<template>

<div class="bg-gray-100 border w-60 text-sm text-gray-500">
    <SidebarTopMenu />
    <SidebarFolder v-for="folder in f.folders" :key="folder" :item="folder" />
    <SidebarFile v-for="file in f.files" :key="file" :name="file"/>
</div>

</template>
