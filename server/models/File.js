import mongoose from "mongoose";


const FileSchema = new mongoose.Schema({
    name:{
        type:String
    },
    content:{
        type:String
    },
    extension:{
        type:String
    },
    isSaved:{
        type:Boolean
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    },
    {
        timestamps:true,
    }
);

export default mongoose.model('File', FileSchema);