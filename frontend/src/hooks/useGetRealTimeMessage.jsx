// import React, { useEffect } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
// import { setMessages } from '../redux/messageSlice'

// export default function useGetRealTimeMessage() {
//     const { socket} = useSelector(store => store.socket)
//     const { messages } = useSelector(store => store.message)
//     const dispatch = useDispatch()
//     useEffect(() => {
//         if (socket) {
//             socket.on("newMessage", (newMessage) => {
//                 console.log("new Message", newMessage);
//                 // Append the new message to existing messages
//                 dispatch(setMessages([...(messages || []), newMessage]));
//             });
//         }
        
//         return () => {
//             if (socket) {
//                 socket.off("newMessage");
//             }
//         };
//     }, [socket, dispatch, messages])
// }


import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setMessages } from '../redux/messageSlice'

export default function useGetRealTimeMessages() {
    const { socket } = useSelector(store => store.socket)
    const { messages } = useSelector(store => store.message)
    const dispatch = useDispatch()
    
    useEffect(() => {
        if (socket) {
            socket.on("newMessage", (newMessage) => {
                console.log("new Message", newMessage);
                dispatch( ...messages , setMessages(newMessage)); // Use a separate action for adding single messages
            });
        }
        
        return () => {
            if (socket) {
                socket.off("newMessage");
            }
        };
    }, [socket, dispatch , messages]) // Remove messages from dependency array
}