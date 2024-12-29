import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

export default function SingleMessage({ message }) {
    const scroll = useRef();
    const { authUser, selectedUser } = useSelector((store) => store.user);
    const formatTime = (utcDateString) => {
        const date = new Date(utcDateString);
        return date.toLocaleTimeString('en-IN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    useEffect(() => {
        scroll.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    return (
        <div ref={scroll} className={`chat ${authUser?.id === message.senderId ? 'chat-end' : 'chat-start'}`}>
            <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                    <img
                        alt="Avatar"
                        src={
                            authUser?.id === message.senderId
                                ? authUser.profilePhoto
                                :  selectedUser.profilePhoto
                        }
                        loading="lazy"
                    />
                </div>
            </div>
            <div className="chat-bubble">{message.message}</div>
            <div className="chat-footer text-xs text-gray-400">{formatTime(message.createdAt)}</div>
        </div>
    );
}
