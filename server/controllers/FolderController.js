import FolderModel from "../models/Folder.js"
import UserModel from "../models/User.js"

const populateFolders = async (folder) => {

    const populatedFolder = await FolderModel.findById(folder._id)
        .populate('folders')
        .populate('files')
        .lean();


    if (populatedFolder.folders && populatedFolder.folders.length > 0) {
        populatedFolder.folders = await Promise.all(
            populatedFolder.folders.map(async (childFolder) => {
                return await populateFolders(childFolder);
            })
        );
    }

    return populatedFolder;
};

const rootparentid = async(userId)=>{

    const user = await UserModel.findOne({
        _id: userId
    })
    return user.rootFolder
}
export const getFolders = async (req, res) => {
    const user_id = req.userId;
    const parent = await rootparentid(user_id);
    try {

        const rootFolders = await FolderModel.find({ user: user_id, parentId:parent }).lean();


        const folders = await Promise.all(
            rootFolders.map(async (folder) => {
                return await populateFolders(folder);
            })
        );

        res.json(folders);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить папочки',
        });
    }
};

export const getOne = async(req,res)=>{
    try {
        const rootFolders = await FolderModel.find({ _id: req.params.id}).lean();
        const folders = await Promise.all(
            rootFolders.map(async (folder) => {
                return await populateFolders(folder);
            })
        );

        res.json(folders[0]);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить папочку',
        });
        
    }
}

export const remove = async(req,res)=>{
    try {
        const folderId = req.params.id;

        await FolderModel.findOneAndDelete({
            _id:folderId,
        }).then(folderId => {res.json({success:true})});

        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить папочку',
        });
        
    }
}

export const create = async (req, res) => {
    try {
        const doc = new FolderModel({
            name: req.body.name,
            files: req.body.files,
            folders: req.body.folders,
            parentId: req.body.parentId,
            layer:req.body.layer,
            user:req.userId
        });

        const folder = await doc.save();

        res.json({"_id": folder._id});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать папочку',
        });
        
    }
};

export const update = async(req, res) => {
    try {
        const folderId = req.params.id;
        await FolderModel.updateOne({
            _id: folderId,
        },
        {
            name: req.body.name,
            files: req.body.files,
            folders: req.body.folders,
            parentId: req.body.parentId,
            layer:req.body.layer,
        },
        );
        FolderModel.findOne(
            {
            _id: folderId
        }).then(folder => {
            res.json({_id})});
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обновить папочку',
        })
        
    }
};

export const add_folder = async(req, res) => {
    try {
        const folderId = req.params.id;
        await FolderModel.updateOne({
            _id: folderId,
        },
        { $push: { folders: req.body.newFolderId } },
        );
        FolderModel.findOne(
            {
            _id: folderId
        }).then(folder => {res.json(folder)});
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обновить папочку',
        })
        
    }
};

export const add_file = async(req, res) => {
    try {
        const folderId = req.params.id;
        await FolderModel.updateOne({
            _id: folderId,
        },
        { $push: { files: req.body.newFileId } },
        );
        FolderModel.findOne(
            {
            _id: folderId
        }).then(folder => {res.json(folder)});
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обновить папочку',
        })
        
    }
};


