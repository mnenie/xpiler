import { defineStore } from "pinia";
import type { IFile } from "@/types/folder.interface";
import { aboutFile } from "~/mocks/about.mock";

export const useEditorStore = defineStore("editor", () => {
  const activeTabs = ref<IFile[]>([] as IFile[]);
  const symbols = ref<string>('');
  const extension = ref<string>('');

  const toggleFile = (file: IFile) => {
    const index = activeTabs.value.findIndex((f) => f._id === file._id);
    if (index === -1) {
      if (activeTabs.value.length > 1) {
        const prevFile = activeTabs.value[activeTabs.value.length - 1];
        removeFile(prevFile._id);
      }
      activeTabs.value.push(file);
      navigateTo(COMPILER_ROUTE + '/' + file._id);
    }
  };

  const removeFile = (id: string) => {
    activeTabs.value = activeTabs.value.filter((f) => f._id !== id);
    if(activeTabs.value.length === 1){
      navigateTo(COMPILER_ROUTE + '/' + 'about_compiler')
    }
  };

  onMounted(() => {
    activeTabs.value.unshift(aboutFile)
  })

  return {
    activeTabs,
    symbols,
    extension,
    // methods
    toggleFile,
    removeFile,
  };
});
