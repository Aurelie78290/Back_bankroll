import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./router/router.js";

dotenv.config();

const app = express();

app.use(cors({origin:"*"}));
app.use(express.json());


//route de test
app.get('/', (req,res) => {
    res.json({message: 'Tu es sur la route de api bankroll'});
});

//onajoute les routes
app.use('/api', router);


//on écoute le port 4242
const PORT = process.env.PORT || 4242;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

