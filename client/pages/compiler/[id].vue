<script setup lang="ts">
import { useFolderStore } from "~/stores/folderStore";
import { useEditorStore } from "~/stores/editorStore";
const folderStore = useFolderStore();
const editorStore = useEditorStore();

const route = useRoute();

const keyBindings = async (e: KeyboardEvent) => {
  if ((e.metaKey || e.ctrlKey) && e.key === "s") {
    e.preventDefault();
    folderStore.updateContent(
      useRoute().params.id as string,
      folderStore.dir,
      editorStore.symbols
    );
  }
};

onMounted(() => {
  if (document) {
    document.addEventListener("keydown", keyBindings);
  }
});

onUnmounted(() => {
  if (document) {
    document.removeEventListener("keydown", keyBindings);
  }
});
</script>

<template>
  <div class="h-full w-full">
    <EditorMonaco />
  </div>
</template>
