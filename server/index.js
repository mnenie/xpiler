import express from "express";
import mongoose from "mongoose";

import { FolderController, UserController, FileController } from "./controllers/index.js";
import {checkAuth, handleValidationErrors} from "./utils/index.js";

mongoose.set("strictQuery", false);
mongoose
    .connect('mongodb+srv://adminius:adminius@clasterchik.ze2xaba.mongodb.net/mirea_hack?retryWrites=true&w=majority&appName=clasterchik')
    .then(() => console.log('DB ok'))
    .catch((err) => console.log('DB error', err));

const app = express();
app.use(express.json());


app.listen(1234, (err)=>{
    if (err) {
        return console.log(err);
    }

    console.log('Server OK ');
});

app.get('/', (req,res) => {
    res.send('Гугуца батрачит')
});

//
app.post('/auth/login', handleValidationErrors, UserController.login);
app.get('/auth/me', checkAuth, UserController.getMe);
//folders
app.get('/folders',checkAuth,FolderController.getFolders);
app.get('/folders/:id',checkAuth, FolderController.getOne);
app.post('/folders', checkAuth, handleValidationErrors, FolderController.create);
app.delete('/folders/:id', checkAuth, FolderController.remove);
app.patch('/folders/:id', checkAuth, handleValidationErrors, FolderController.update);
app.put('/folders/:id/add_folder', checkAuth, FolderController.add_folder);
app.put('/folders/:id/add_file', checkAuth, FolderController.add_file);
//files

app.get('/files',checkAuth,FileController.getFiles);
app.get('/files/:id',checkAuth, FileController.getOne);
app.post('/files', checkAuth, handleValidationErrors, FileController.create);
app.delete('/files/:id', checkAuth, FileController.remove);
app.patch('/files/:id', checkAuth, handleValidationErrors, FileController.update)
