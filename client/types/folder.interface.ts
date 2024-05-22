export interface IFolder {
    _id: string,
    name: string,
    files: Array<IFile>,
    folders: Array<IFolder>,
    parentId: string,
    layer: number,
    isFolded: boolean
}

export interface IFile {
    _id: string,
    name: string,
    extension: string,
    parentId: string,
    content: string,
    isSaved: boolean,
}