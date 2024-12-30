

import { Server } from 'socket.io';

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: ['http://localhost:5173'], // Your Vite app
            methods: ['GET', 'POST'],
        },
    });

    const userSocketMap ={
    
    } 

    io.on('connection', (socket) => {
        console.log('User Connected:', socket.id);
        const userId = socket.handshake.query.userId

        if(userId !== undefined) {
            userSocketMap[userId] = socket.id 
        }

        io.emit('getOnlineUsers' , Object.keys(userSocketMap))

        socket.on('disconnect', (reason) => {
            console.log(`Socket ${socket.id} disconnected`);
            delete userSocketMap[userId]
            io.emit('getOnlineUsers' , Object.keys(userSocketMap))
        });

        socket.on('error', (err) => {
            console.error(`Socket ${socket.id} error:`, err);
        });
    });

    return io;
};

export default initializeSocket;
