import React, { useState } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from '../redux/messageSlice';
import useGetMessages from '../hooks/useGetMessages';
import useGetRealTimeMessages from '../hooks/useGetRealTimeMessages';


export default function SendInput() {

    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const { selectedUser } = useSelector((store) => store.user);
    const { messages } = useSelector((store) => store.message);
    const { socket } = useSelector((store) => store.socket);
    const id = selectedUser?._id;


    useGetMessages()
    // useGetRealTimeMessages()

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        if (!message.trim()) return; // Avoid empty messages
        try {
            const res = await axios.post(
                `http://localhost:3000/message/send/${id}`,
                { message },
                { headers: { "Content-Type": "application/json" }, withCredentials: true }
            );

            const newMessage = res?.data?.newMessage;
            // console.log("newMessage", newMessage);
            // console.log("socket inside socket" , socket);
            if (newMessage) {
                // Append the new message to Redux state
                socket.emit('newMessage', newMessage);
                dispatch(setMessages([...messages, newMessage]));
            }
        } catch (error) {
            console.error("Error in onSubmitHandler:", error);
        }
        setMessage(" "); // Reset input field
    }

    return (
        <div className="relative">
            <div className="absolute bottom-0 w-full p-4">
                <form action="" onSubmit={onSubmitHandler}>
                    <label className="input outline-0 text-xl p-2 input-bordered flex items-center gap-2 w-full">
                        <input
                            type="text"
                            className="grow w-full p-4 text-[25px]"
                            placeholder="Write a Message ..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                        />
                        <button onClick={onSubmitHandler}>
                            <svg
                                className="cursor-pointer"
                                fill="#A6ADBB"
                                height="30px"
                                width="30px"
                                version="1.1"
                                id="Layer_1"
                                xmlns="http://www.w3.org/2000/svg"
                                xmlnsXlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 512.00 512.00"
                                xmlSpace="preserve"
                                stroke="#ffffff"
                            >
                                <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                                <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="15.360029999999998"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <g>
                                        <g>
                                            <g>
                                                <path d="M483.927,212.664L66.967,25.834C30.95,9.695-7.905,42.024,1.398,80.367l21.593,89.001 c3.063,12.622,11.283,23.562,22.554,30.014l83.685,47.915c6.723,3.85,6.738,13.546,0,17.405l-83.684,47.915 c-11.271,6.452-19.491,17.393-22.554,30.015L1.398,431.633c-9.283,38.257,29.507,70.691,65.569,54.534l416.961-186.83 C521.383,282.554,521.333,229.424,483.927,212.664z M468.609,265.151l-416.96,186.83c-7.618,3.417-15.814-3.398-13.845-11.516 l21.593-89.001c0.647-2.665,2.383-4.975,4.761-6.337l83.685-47.915c31.857-18.239,31.887-64.167,0-82.423l-83.685-47.916 c-2.379-1.362-4.115-3.672-4.761-6.337L37.804,71.535c-1.945-8.016,6.128-14.975,13.845-11.514L468.61,246.85 C476.522,250.396,476.542,261.596,468.609,265.151z"></path>
                                                <path d="M359.268,238.907l-147.519-66.1c-9.444-4.231-20.523-0.005-24.752,9.435c-4.231,9.44-0.006,20.523,9.434,24.752 L305.802,256l-109.37,49.006c-9.44,4.231-13.664,15.313-9.434,24.752c4.231,9.443,15.312,13.663,24.752,9.435l147.519-66.101 C373.996,266.495,374.006,245.51,359.268,238.907z"></path>
                                            </g>
                                        </g>
                                    </g>
                                </g>
                            </svg>
                        </button>
                    </label>
                </form>
            </div>
        </div>
    )
}
