// import {Server} from "socket.io";
// import http from "http";
// import express from "express";

// const app = express();

// const server = http.createServer(app);
// const io = new Server(server, {
//     cors:{
//         origin:['http://localhost:5173/'],
//         methods:['GET', 'POST'],
//     },
// });

// io.on('connection', (socket)=>{

//     console.log("user Connected" ,socket.id);
//     console.log(socket.id);

// })
// server.listen(3000, () => {
//     console.log('server running at http://localhost:3000');
//   });
// export {app, io, server};


import { Server } from 'socket.io';

const initializeSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: ['http://localhost:5173'], // Your Vite app
      methods: ['GET', 'POST'],
    },
  });

  io.on('connection', (socket) => {
    console.log('User Connected:', socket.id);

    socket.on('disconnect', (reason) => {
      console.log(`Socket ${socket.id} disconnected: ${reason}`);
    });

    socket.on('error', (err) => {
      console.error(`Socket ${socket.id} error:`, err);
    });
  });

  return io;
};

export default initializeSocket;
