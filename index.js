import express from "express";
import cors from "cors";

const app = express()

app.use(cors({origin:"*"}));

app.get('/', (req,res) => {
    res.send('Tu es sur la route');
});

//on écoute le port 4242
app.listen(4242, () => {
    console.log('http://localhost:4242');
});

