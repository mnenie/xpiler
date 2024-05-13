export interface IFolder {
    id: String,
    name: String,
    files: Array<String>,
    folders: Array<String>,
    parentId: String,
    layer: Number,
    isFolded: boolean
}