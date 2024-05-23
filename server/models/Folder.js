import mongoose from "mongoose";


const FolderSchema = new mongoose.Schema({
    name:{
        type:String
    },
    files: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'File'  
    }],
    folders:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Folder'  
    }],
    parentId:{
        type: String,
    },
    layer:{
        type:Number
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model('Folder', FolderSchema);