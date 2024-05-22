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

      postFolder(newFolder).then(resp => {
        let newFolderId = resp.data._id;
        putFolder(parentId, newFolderId);
      }).catch(err => console.log(err));

      globalId += 1;
      globalId %= 32768;
      return;
    }
    folder.folders.forEach((f) => createFolder(folder._id, f, layer + 1));
  };

  const createFile = (parentId: string, folder: IFolder, layer: number) => {
    if (parentId == folder._id) {
      const newFile = {
        _id: globalId.toString(),
        content: "// Start coding",
        name: "index",
        parentId: parentId,
        extension: "js",
        isSaved: true,
      } as IFile;
      folder.files.push(newFile);

      postFile(newFile).then(resp => {
        let newFileId = resp.data._id;
        putFile(parentId, newFileId);
      }).catch(err => console.log(err));

      globalId += 1;
      globalId %= 32768;
      return;
    }
    folder.folders.forEach((f) => createFile(parentId, f, layer + 1));
  };

  const renameFolder = (name: string, id: string, folder: IFolder) => {
    folder.folders.forEach((f) => {
      if (f._id == id) {
        f.name = name;
        patchFolder(id, {name: name}).catch(err => console.log(err))
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
        patchFile(id, {name: f.name, extension: extension}).catch(err => console.log(err));
        return;
      }
    });
    folder.folders.forEach((f) => renameFile(name, id, f));
  };

  const deleteFolder = (id: string, folder: IFolder) => {
    if (folder.folders.some((f) => f._id == id)) {
      folder.folders = folder.folders.filter((f) => f._id !== id);
      delFolder(id).catch(err => console.log(err));
      return;
    }
    folder.folders.forEach((f) => deleteFolder(id, f));
  };

  const deleteFile = (id: string, folder: IFolder) => {
    if (folder.files.some((f) => f._id == id)) {
      folder.files = folder.files.filter((f) => f._id !== id);
      delFile(id).catch(err => console.log(err));
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
    folder.files.forEach(async (f) => {
      if (f._id == id) {
        try{
          const response = await patchFile(id, {content: content})
          f.content = content
          return response
        } catch (err) {
          console.log(err)
        }
      }
    });
    folder.folders.forEach((f) => updateContent(id, f, content));
  }
  
  const getUserFolders = async () => {
    try {
      console.log(dir.value._id)
      const response = await getFolders(dir.value._id);
      console.log(response)
      dir.value.folders = response.data.folders;
      dir.value.files = response.data.files;
    } catch (err) {
      console.log(err);
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
