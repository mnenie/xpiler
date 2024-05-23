import FileModel from "../models/File.js"

export const getFiles = async(req,res)=>{
    const user_id = req.userId
    try {
        const Files = await FileModel.find({
            user: user_id});

        res.json(Files);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить файлы',
        });
        
    }
}

export const getOne = async(req,res)=>{
    try {
        const FileId = req.params.id;
        FileModel.findOne(
            {
            _id: FileId
        }).then(File => {res.json(File)});
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось получить файл',
        });
        
    }
}

export const remove = async(req,res)=>{
    try {
        const FileId = req.params.id;

        await FileModel.findOneAndDelete({
            _id:FileId,
        }).then(FileId => {res.json({success:true})});

        
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось удалить файл',
        });
        
    }
}

export const create = async (req, res) => {
    try {
        const doc = new FileModel({
            name: req.body.name,
            content:req.body.content,
            extension:req.body.extension,
            isSaved:req.body.isSaved,
            user:req.userId,
            parentId: req.body.parentId,
        });

        const File = await doc.save();

        res.json(File);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Не удалось создать файл',
        });
        
    }
};

export const update = async(req, res) => {
    try {
        const FileId = req.params.id;
        await FileModel.updateOne({
            _id: FileId,
        },
        {
            name: req.body.name,
            content:req.body.content,
            extension:req.body.extension,
            isSaved:req.body.isSaved,
            user:req.userId,
            parentId: req.body.parentId,
        },
        );
        FileModel.findOne(
            {
            _id: FileId
        }).then(File => {res.json(File)});
    } catch (err) {
        res.status(500).json({
            message: 'Не удалось обновить файл',
        })
        
    }
};


