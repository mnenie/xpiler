<script setup lang="ts">
const authStore = useAuthStore();
const folderStore = useFolderStore();

onMounted(async () => {
  await authStore.getCurrentUser();
});
</script>

<template>
  <div class="grid-container h-dvh w-full">
    <LayoutHeader class="header" />
    <LayoutSidebar class="sidebar" />
    <div class="slot">
      <slot />
    </div>
    <LayoutFooter class="footer" />
  </div>
</template>

<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto 1fr auto;
  grid-template-areas:
    "header header"
    "sidebar slot"
    "footer footer";
  min-height: 100dvh;
}

.header {
  grid-area: header;
}

.sidebar {
  grid-area: sidebar;
}

.slot {
  grid-area: slot;
  display: flex;
  flex-direction: column;
}

.footer {
  grid-area: footer;
}
</style>
