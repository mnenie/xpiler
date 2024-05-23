import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    Gitid:{
        type: String,
        unique: true,
    },
    photoURL:{
        type:String,
        
    },
    rootFolder:{
        type:String,
    }
    },
    {
        timestamps:true,
    }
);

export default mongoose.model('User', UserSchema);