import React from 'react';
import SendInput from "./SendInput"
import Messages from './Messages';
import { useSelector } from 'react-redux';

export default function MessageContainer() {



    const { selectedUser } = useSelector((store) => store.user)

    // console.log(selectedUser);
    if (!selectedUser) {
        return
    }
    return (
        <div className="flex flex-col h-full w-full">
            <div className="flex gap-5 mt-3 bg-hoverBlack p-2 ease-in duration-200 rounded-md flex-wrap items-center w-full">
                <div className="avatar online">
                    <div className="w-12 h-12 rounded-full">
                        <img src={selectedUser?.profilePhoto} alt="" />
                    </div>
                </div>
                <div className="flex-grow">
                    <div className="text-xl w-full">
                        <p>{selectedUser?.fullName}</p>
                    </div>
                </div>
            </div>
            <Messages />
            <div className="flex-grow"></div> {/* This div will take up the remaining space */}

            <SendInput  />
        </div>
    );
}
