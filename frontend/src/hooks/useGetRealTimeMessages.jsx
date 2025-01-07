import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addMessage } from '../redux/messageSlice'

export default function useGetRealTimeMessages() {
    const { socket } = useSelector(store => store.socket)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (socket) {
            // console.log("socket", socket);
            // console.log("inside the useGetRealTimeMessages");

            socket.on("receiveMessage", (newMessage) => {
                // console.log("new Message at client side", newMessage);
                dispatch(addMessage(newMessage));
            });
        }
        
        return () => {
            if (socket) {
                socket.off("receiveMessage");
            }
        };
    }, [socket, dispatch])
}


// import { useEffect } from "react";
// import {useSelector, useDispatch} from "react-redux";
// import { setMessages } from "../redux/messageSlice";

// const useGetRealTimeMessage = () => {
//     const {socket} = useSelector(store=>store.socket);
//     const {messages} = useSelector(store=>store.message);
//     const dispatch = useDispatch();
//     useEffect(()=>{
//         socket?.on("newMessage", (newMessage)=>{
//             dispatch(setMessages([...messages, newMessage]));
//         });
//         return () => socket?.off("newMessage");
//     },[setMessages, messages]);
// };
// export default useGetRealTimeMessage;