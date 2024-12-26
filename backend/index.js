import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/database.js';
import express from "express";
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cors from "cors"

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;


// routes 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOption= {
    origin:"http://localhost:5173" ,
    credentials : true
}
app.use(cors(corsOption))

app.use('/user', userRoute);
app.use('/message', messageRoute);


app.get('/', (req, res) => {
    res.send("hi i am working ")
})

app.listen(PORT, () => {
    console.log(`Server running Port ${PORT} `);
})