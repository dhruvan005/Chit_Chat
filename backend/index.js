import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/database.js';
import express from "express";
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';

const app = express();
connectDB();

const PORT = process.env.PORT || 3000;


// routes 

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/user', userRoute);

app.get('/', (req, res) => {
    res.send("hi i am working ")
})

app.listen(PORT, () => {
    console.log(`Server running Port ${PORT} `);
})