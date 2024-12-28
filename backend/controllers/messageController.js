import { Conversation } from '../models/conversationModel.js';
import mongoose from 'mongoose';
import { Message } from '../models/messageModel.js';
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

        if (newMessage) {
            gotConversation.messages.push(newMessage._id)
            gotConversation.save()
        }

        return res.status(200).json({
            message: "Message sent"
        })

    } catch (error) {
        console.log("Error in sendMessage", error);
        return res.status(500).json({ message: "Server error" });
    }
}


// this get message gives the conversation between specific id's
export const getMessage = async (req, res) => {
    try {
        const senderId = req.id
        const receiverId = req.params.id; 
        // in the url

        if (!mongoose.Types.ObjectId.isValid(senderId) || !mongoose.Types.ObjectId.isValid(receiverId)) {
            return res.status(400).json({ message: "Invalid sender or receiver ID" });
        }

        const conversation = await Conversation.find({
            participants: { $all: [senderId, receiverId] }
        }).populate("messages");

        console.log("convo" , conversation);
        return res.status(200).json({
            message: "Message Get Done ",
            conversation
        })
    } catch (error) {
        console.log("Error in getMessage", error);
        return res.status(500).json({ message: "Server error" });
    }
} 