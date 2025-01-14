import dotenv from 'dotenv';
dotenv.config();


import connectDB from './config/database.js';
import express from "express";
import cookieParser from 'cookie-parser';
import userRoute from './routes/userRoute.js';
import messageRoute from './routes/messageRoute.js';
import cors from "cors"
import http from 'http';
import initializeSocket from './socket/socket.js'; 
import path from 'path';


const app = express();


const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = initializeSocket(server);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/public', express.static(path.join("__dirname", 'public')));


const corsOption={
    origin: process.env.FRONT_END_URI,
    credentials: true
};
app.use(cors(corsOption)); 


app.use('/user', userRoute);
app.use('/message', messageRoute);



server.listen(PORT, () => {
    connectDB()
    console.log(`Server running at ${PORT}`);
  });

export { app, io, server };