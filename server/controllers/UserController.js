import jwt from "jsonwebtoken";
import UserModel from '../models/User.js';
import FolderModel from '../models/Folder.js'

export const login = async(req, res)=>{
    try{
        const user = await UserModel.findOne({ Gitid: req.body.Gitid});

        if (!user){
            try{
                if(!req.body.photoURL){
                    req.body.photoURL = 'https://www.shadcn-vue.com/avatars/02.png'
                };
                const new_folder_doc = new FolderModel({
                    name: "root",
                    layer:0,
                    parentId:"0",
                    isFolded:false,

                });
                const new_folder = await new_folder_doc.save();
                
                const doc = new UserModel({
                    email:req.body.email,
                    Gitid:req.body.Gitid,
                    photoURL:req.body.photoURL,
                    rootFolder: new_folder._id,

                });
                const user = await doc.save();

                await FolderModel.updateOne({
                    _id: new_folder._id,
                },
                { user:user._id },
                );
            
                const token = jwt.sign({
                    _id: user._id,
                },
                'unreal_hash',
                {
                    expiresIn: '30d',
                });
            
                const {password, ...userData} = user._doc;
            
                res.json({
                    ...userData,
                    token,
                    text:'создан новый'
                });
                } catch(err){
                    console.log(err);
                    res.status(500).json({
                        message: 'Не удалось зарегаться',
                    });
                };}

        else if (user){      
            const token = jwt.sign(
                {
                _id: user._id,
                },
                'unreal_hash',
                {
                expiresIn: '30d',
                }
            );

            const {password, ...userData} = user._doc;

            res.json({
                ...userData,
                token,
                text:'зашел в существующий'
            });}

        } catch(err){
        console.log(err);
        res.status(500).json({
            message: 'Не удалось авторизоваться',
        });
    }
};

export const getMe = async (req,res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if(!user){
            return res.status(404).json({
                message:'Пользователь не найден'
            });
        }

        const {password, ...userData} = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Нет доступа',
        });
    }
};

