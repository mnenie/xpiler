import { defineStore } from "pinia";
import type { IFile, IFolder } from "@/types/folder.interface";

export const useFolderStore = defineStore("folder", () => {
  const { getFile, postFile, putFile, delFile, patchFile,
    getFolders, postFolder, putFolder, delFolder, patchFolder } = useFolder();

  let globalId = 0;

  let dir = ref({
    _id: "0",
    name: "root",
    files: [],
    folders: [],
    parentId: "0",
    layer: 0,
    isFolded: false,
  } as IFolder);

  const createFolder = (parentId: string, folder: IFolder, layer: number) => {
    if (parentId == folder._id) {
      const newFolder = {
        _id: globalId.toString(),
        name: "New folder",
        files: [],
        folders: [],
        parentId: parentId,
        layer: layer,
        isFolded: false,
      } as IFolder;
      folder.folders.push(newFolder);

      if (dir.value._id !== "0") {
        postFolder(newFolder).then(resp => {
          let newFolderId = resp.data._id;
          putFolder(parentId, newFolderId);
        }).catch(err => console.log(err));
      }

      globalId = (globalId + 1) % 32768;
      return;
    }
    folder.folders.forEach((f) => createFolder(folder._id, f, layer + 1));
  };

  const createFile = async (parentId: string, folder: IFolder, layer: number) => {
    if (parentId == folder._id) {
      const newFile = ref({
        _id: globalId.toString(),
        content: "// Start coding",
        name: "index",
        parentId: parentId,
        extension: "js",
        isSaved: true,
      }  as IFile);
      folder.files.push(newFile.value);

      if (dir.value._id !== "0") {
        try {
          const resp = await postFile(newFile.value);
          newFile.value._id = resp.data._id;
          await putFile(parentId, resp.data._id);
        } catch (err) {
          console.error(err);
        }
      }

      globalId = (globalId + 1) % 32768;
      return;
    }

    folder.folders.forEach((f) => createFile(parentId, f, layer + 1));
  };

  const renameFolder = (name: string, id: string, folder: IFolder) => {
    folder.folders.forEach((f) => {
      if (f._id == id) {
        f.name = name;
        if (dir.value._id !== "0") patchFolder(id, {name: name}).catch(err => console.log(err));
        return;
      }
      renameFolder(name, id, f);
    });
  };

  const renameFile = (name: string, id: string, folder: IFolder) => {
    folder.files.forEach((f) => {
      if (f._id == id) {
        const fullname = name.split(".");
        const extension = fullname.pop();
        f.name = fullname.join(".");
        f.extension = extension || "";
        if (dir.value._id !== "0") patchFile(id, {name: f.name, extension: extension}).catch(err => console.log(err));
        return;
      }
    });
    folder.folders.forEach((f) => renameFile(name, id, f));
  };

  const deleteFolder = (id: string, folder: IFolder) => {
    if (folder.folders.some((f) => f._id == id)) {
      folder.folders = folder.folders.filter((f) => f._id !== id);
      if (dir.value._id !== "0") delFolder(id).catch(err => console.log(err));
      return;
    }
    folder.folders.forEach((f) => deleteFolder(id, f));
  };

  const deleteFile = (id: string, folder: IFolder) => {
    if (folder.files.some((f) => f._id == id)) {
      folder.files = folder.files.filter((f) => f._id !== id);
      if (dir.value._id !== "0") delFile(id).catch(err => console.log(err));
      return;
    }
    folder.folders.forEach((f) => deleteFile(id, f));
    if (folder.folders.length === 0) navigateTo(COMPILER_ABOUT_ROUTE);
  };

  const toggleFold = (id : string, folder : IFolder) => {
    if (folder._id == id) {
      folder.isFolded = !folder.isFolded;
      return;
    }
    folder.folders.forEach(f => toggleFold(id, f))
  }


  const updateContent = (id: string, folder: IFolder, content: string) => {
    folder.files.forEach((f) => {
      if (f._id === id && f._id !== "about_compiler") {
          if (dir.value._id !== "0") patchFile(id, {content: content}).catch(err => console.log(err));
          f.content = content
          return;
        }
    });
    folder.folders.forEach(f => updateContent(id, f, content))
  }
  
  const getUserFolders = async () => {
    try {
      const response = await getFolders(dir.value._id);
      dir.value.folders = response.data.folders;
      dir.value.files = response.data.files;
    } catch (err) {
      // console.log(err);
    }
  };

  return {
    dir,
    // methods
    createFolder,
    createFile,
    renameFolder,
    renameFile,
    deleteFolder,
    deleteFile,
    toggleFold,
    getUserFolders,
    updateContent
  };
});
