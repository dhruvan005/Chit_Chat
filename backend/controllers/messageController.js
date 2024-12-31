import { Conversation } from '../models/conversationModel.js';

import { Message } from '../models/messageModel.js';

import { getReceiverSocketId } from "../socket/socket.js"
import initializeSocket from '../socket/socket.js';
const io = initializeSocket();

export const sendMessage = async (req, res) => {
    try {
        const senderId = req.id; // logged in user's id
        const receiverId = req.params.id; // in the url 
        const { message } = req.body;
        let gotConversation = await Conversation.findOne({ participants: { $all: [senderId, receiverId] } });

        if (senderId === receiverId) {
            return res.status(400).json({ message: "Sender and receiver cannot be the same" });
        }

        if (!gotConversation) {
            gotConversation = await Conversation.create({
                participants: [senderId, receiverId],

            });

        }
        const newMessage = await Message.create({
            senderId,
            receiverId,
            message
        });

        gotConversation.messages.push(newMessage._id);
        await gotConversation.save(); // Save once to avoid ParallelSaveError

        // Emit message through Socket.IO
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("newMessage", newMessage); // Emit the new message
        }

        return res.status(201).json({ newMessage });

    } catch (error) {
        console.log("Error in sendMessage", error);
        return res.status(500).json({ message: "Server error" });
    }
}


// this get message gives the conversation between specific id's
export const getMessage = async (req, res) => {
    try {
        const receiverId = req.params.id;
        const senderId = req.id;
        const conversation = await Conversation.findOne({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");
        // console.log(conversation);
        return res.status(200).json(conversation?.messages);
    } catch (error) {
        console.log(error);
    }
} 