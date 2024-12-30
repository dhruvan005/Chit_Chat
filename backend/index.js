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



const app = express();

connectDB();
const server = http.createServer(app);
const PORT = process.env.PORT || 3000;

const io = initializeSocket(server);

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



server.listen(3000, () => {
    console.log('Server running at http://localhost:3000');
  });

export { app, io, server };