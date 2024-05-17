export interface IFolder {
    id: string,
    name: string,
    files: Array<IFile>,
    folders: Array<IFolder>,
    parentId: String,
    layer: number,
    isFolded: boolean
}

export interface IFile {
    id: string,
    name: string,
    extension: string,
    content: string,
    isSaved: boolean,
}