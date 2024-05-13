<script setup>

const props = defineProps(["item"])

</script>

<template>

<div>
    <div class="flex flex-row space-x-2 items-center cursor-pointer hover:bg-slate-300 px-3">
      <iconsFolderIcon />
      <p>{{ props.item.name }}</p>  
    </div>
    <div>
        <SidebarFolder v-if="props.item.folders.length > 0" v-for="folder in item.folders" :key="folder" :item="folder"/>
        <SidebarFile v-for="file in item.files" :key="file" :name="file" />
    </div>
</div>


</template>