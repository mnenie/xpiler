import type { AxiosResponse } from "axios";
import type { IFile, IFolder } from "~/types/folder.interface";


export default function UseFolder(){
    const { $api } = useNuxtApp();

    // files
    const getFiles = async () : Promise<AxiosResponse<IFile[]>> => {
        const resp = await $api.get("/files", {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
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
    const delFile = async (id: string) => {
        const resp = await $api.delete(`/files/${id}`, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const patchFile = async (id: string, file: IFile) => {
        const resp = await $api.patch(`/files/${id}`, file, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    // folders
    const getFolders = async () : Promise<AxiosResponse<IFolder[]>> => {
        const resp = await $api.get("/folders", {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const getFolder = async (id : string) : Promise<AxiosResponse<IFolder>> => {
        const resp = await $api.get(`/folders/${id}`, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }
    const postFolder = async (folder: IFolder) => {
        const resp = await $api.post("/folders", folder, {
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
    const patchFolder = async (id: string, folder: IFile) => {
        const resp = await $api.patch(`/folders/${id}`, folder, {
            headers: { Authorization: `Bearer ${useCookie("token").value}` },
          });
        return resp;
    }


    return {
        getFile, 
        getFiles,
        postFile,
        delFile, 
        patchFile,
        getFolder, 
        getFolders,
        postFolder,
        delFolder, 
        patchFolder
    }
}