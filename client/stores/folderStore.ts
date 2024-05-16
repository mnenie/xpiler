import { defineStore } from 'pinia'
import type { IFile, IFolder } from '@/types/folder.interface';

export const useFolder = defineStore('folder', () => {
    let globalId = 0;
    let dir = ref({
        id: "0",
        name: "root",
        files: [],
        folders: [],
        parentId: "0",
        layer: 0,
        isFolded: false
    } as IFolder)

    const createFolder = (parentId: string, folder : IFolder, layer: number) => {
        if (parentId == folder.id){
            folder.folders.push({
                id: globalId.toString(),
                name: "New folder",
                files: [],
                folders: [],
                parentId: parentId,
                layer: layer,
                isFolded: false
            } as IFolder);
            globalId += 1;
            globalId %= 32768;
            return;
        }
        folder.folders.forEach(f => createFolder(folder.id, f, layer + 1));
    }

    const createFile = (parentId: string, folder : IFolder, layer: number) => {
        if (parentId == folder.id){
            folder.files.push({
                id: globalId.toString(),
                content: "text",
                name: "index",
                extension: "js",
                isSaved: true,
            } as IFile);
            globalId += 1;
            globalId %= 32768;
            return;
        }
        folder.folders.forEach(f => createFile(parentId, f, layer + 1));
    }

    const renameFolder = (name: string, id : string, folder: IFolder) => {
        folder.folders.forEach(f => {
            if (f.id == id){
                f.name = name;
                return;
            }
            renameFolder(name, id, f);
        });
    }

    const renameFile = (name: string, id : string, folder: IFolder) => {
        folder.files.forEach(f => {
            if (f.id == id){
                const fullname = name.split('.');
                const extension = fullname.pop();
                f.name = fullname.join('.');
                f.extension = extension || "";
                return;
            }
        });
        folder.folders.forEach(f => renameFile(name, id, f));
    }
    
    const deleteFolder = (id: string, folder : IFolder) => {
        if (folder.folders.some(f => f.id == id)) {
            folder.folders = folder.folders.filter(f => f.id !== id);
            return;
        }
        folder.folders.forEach(f => deleteFolder(id, f));
    }

    const deleteFile = (id: string, folder : IFolder) => {
        if (folder.files.some(f => f.id == id)) {
            folder.files = folder.files.filter(f => f.id !== id);
            return;
        }
        folder.folders.forEach(f => deleteFile(id, f));
    }

    return {
        dir,
        // methods
        createFolder,
        createFile,
        renameFolder,
        renameFile,
        deleteFolder,
        deleteFile
    }
})