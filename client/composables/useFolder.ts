import type { AxiosResponse } from "axios";
import type { IFile, IFolder } from "~/types/folder.interface";


export default function UseFolder(){
    const { $api } = useNuxtApp();

    // files
    const getFile = async (id : string) : Promise<AxiosResponse<IFile>> => {
        const resp = await $api.get(`/files/${id}`, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const postFile = async (file: IFile) => {
        const resp = await $api.post("/files", file, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const putFile = async (id : string, fileId: string) => {
        const resp = await $api.put(`/folders/${id}/add_file`, {
          newFileId: fileId
        }, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const delFile = async (id: string) => {
        const resp = await $api.delete(`/files/${id}`, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const patchFile = async (id: string, file: object) => {
        const resp = await $api.patch(`/files/${id}`, file, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    // folders
    const getFolders = async (id: string) => {
        const resp = await $api.get(`/folders/${id}`, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const postFolder = async (folder: IFolder) => {
        const resp = await $api.post("/folders", {
          name: folder.name,
          parentId: folder.parentId,
          layer: folder.layer
        }, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const putFolder = async (id : string, folderId: string) => {
        const resp = await $api.put(`/folders/${id}/add_folder`, {
          newFolderId: folderId
        }, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const delFolder = async (id: string) => {
        const resp = await $api.delete(`/folders/${id}`, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const patchFolder = async (id: string, folder: object) => {
        const resp = await $api.patch(`/folders/${id}`, folder, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }

    return {
        getFile, 
        postFile,
        putFile,
        delFile, 
        patchFile,
        getFolders,
        postFolder,
        putFolder,
        delFolder, 
        patchFolder
    }
}