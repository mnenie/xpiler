import { defineStore } from 'pinia'
import type { IFile } from '@/types/folder.interface';
import type * as monaco from "monaco-editor";

export const useEditorStore = defineStore('editor', () => {
    const activeTabs = ref<IFile[]>([] as IFile[]);
    const modelMap = new Map<string, monaco.editor.ITextModel>();
    
    const toggleFile = (file : IFile) => {
        if (activeTabs.value.some(f => f.id == file.id)) activeTabs.value = activeTabs.value.filter(f => f.id !== file.id);
        else activeTabs.value.push(file);
    }

    const removeFile = (id: string) => {
        activeTabs.value = activeTabs.value.filter(f => f.id !== id);
    }

    return {
        activeTabs,
        modelMap,
        // methods
        toggleFile,
        removeFile
    }
})