import express from "express";
import mongoose from "mongoose";




mongoose.set("strictQuery", false);
mongoose
    .connect('mongodb+srv://admin:admin@clasterchik.ze2xaba.mongodb.net/?retryWrites=true&w=majority&appName=clasterchik')
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