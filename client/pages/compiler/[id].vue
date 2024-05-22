<script setup lang="ts">
import { useFolderStore } from '~/stores/folderStore';
import { useEditorStore } from '~/stores/editorStore';
const folderStore = useFolderStore();
const editorStore = useEditorStore()


const route = useRoute()

watchEffect(() => {
  const keyBindings = async (e: KeyboardEvent) => {
    if((e.metaKey || e.ctrlKey) && e.key === 's'){
      e.preventDefault();
      folderStore.updateContent(route.params.id as string, folderStore.dir, editorStore.symbols)
    }
  }
  if(document){
    document.addEventListener('keydown', keyBindings)
  }
})
</script>

<template>
  <div class="h-full w-full">
    <EditorMonaco />
  </div>
</template>
