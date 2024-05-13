<script setup>

const f = ["idea", "lift", "ask", "leaving", "fought"];
const files = ref(f);

</script>

<template>

<div class="bg-slate-100 border">
    <SidebarFile v-for="file in files" :key="file" :name="file" />
</div>

</template>
