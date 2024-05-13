export interface IFolder {
    id: String,
    name: String,
    files: Array<IFile>,
    folders: Array<IFolder>,
    parentId: String,
    layer: Number,
    isFolded: boolean
}

export interface IFile {
    id: String,
    name: String,
    extension: String,
    isSaved: boolean,
}