

import React, { useMemo } from 'react';
import SingleMessage from './SingleMessage';
import { useSelector } from 'react-redux';
import useGetRealTimeMessages from '../hooks/useGetRealTimeMessages.jsx';
import useGetMessages from '../hooks/useGetMessages.jsx';

export default function Messages() {
    useGetMessages()
    useGetRealTimeMessages()

    const { messages } = useSelector((store) => store.message);


    const groupedMessages = useMemo(() => {
        if (!Array.isArray(messages)) return {};

        const today = new Date();
        const yesterday = new Date(Date.now() - 86400000); // 86400000ms = 1 day

        const formatDate = (date) => {
            const currentDate = new Date(date).toLocaleDateString('en-IN', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
            });

            const todayDate = today.toLocaleDateString('en-IN');
            const yesterdayDate = yesterday.toLocaleDateString('en-IN');

            if (currentDate === todayDate) return 'Today';
            if (currentDate === yesterdayDate) return 'Yesterday';
            return currentDate;
        };

        return messages.reduce((groups, message) => {
            const formattedDate = formatDate(message.createdAt);
            if (!groups[formattedDate]) groups[formattedDate] = [];
            groups[formattedDate].push(message);
            return groups;
        }, {});
    }, [messages]);

    if (!Array.isArray(messages)) return null;

    return (
        <div className="h-[72vh] overflow-y-auto">
            {Object.entries(groupedMessages).map(([date, messages]) => (
                <div key={date}>
                    {/* Render the date header */}
                    <div className=" w-fit text-center text-neutral-200 rounded-md p-2 m-auto bg-hoverBlack my-4">{date}</div>

                    {messages.map((message) => (
                        <SingleMessage key={message._id} message={message} />
                    ))}
                </div>
            ))}
        </div>
    );
}
