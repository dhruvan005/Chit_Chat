import dotenv from 'dotenv';
dotenv.config();

import connectDB from './config/database.js';
import express from "express"
const app = express();
connectDB();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send("hi i am working ")
})
app.listen(PORT, () => {
    console.log(`Server running Port ${PORT} `);
})