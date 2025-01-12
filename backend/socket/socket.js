import { Server } from 'socket.io';
const userSocketMap = {};

const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
}

const initializeSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: process.env.FRONT_END_URI, // Your Vite app
            methods: ['GET', 'POST'],
        },
    });

    io.on('connection', (socket) => {
        // console.log('User Connected:', socket.id);
        const userId = socket.handshake.query.userId
        // console.log("user Id" , userId);
        if (userId !== undefined) {
            userSocketMap[userId] = socket.id
        }
        socket.on('newMessage', (message) => {
            // console.log('New message received at socket.js ', message);
            // getReceiverSocketId while user is online then and then it will give SocketId otherwise it will givve undefined 
            const receiverSocketId = getReceiverSocketId(message?.receiverId);

            // console.log( "reciverid",receiverSocketId);
            if (receiverSocketId) {
                io.to(receiverSocketId).emit('receiveMessage', message);
            }
        });
        io.emit('getOnlineUsers', Object.keys(userSocketMap))

        socket.on('disconnect', (reason) => {
            // console.log(`Socket ${socket.id} disconnected`);
            delete userSocketMap[userId]
            io.emit('getOnlineUsers', Object.keys(userSocketMap))
        });

        socket.on('error', (err) => {
            console.error(`Socket ${socket.id} error:`, err);
        });
    });

    return io;
};

export default initializeSocket;
export { getReceiverSocketId }