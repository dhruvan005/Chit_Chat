

import React from 'react';
import SendInput from "./SendInput";
import Messages from './Messages';
import { useSelector } from 'react-redux';

export default function MessageContainer() {
  const { selectedUser, authUser, onlineUsers } = useSelector((store) => store.user);
  const isOnline = Array.isArray(onlineUsers) && onlineUsers.includes(selectedUser?._id);

  // console.log("MessageContainer rendering");
  // console.log("selectedUser:", selectedUser);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col h-full w-full">
          <div className="flex gap-5 mt-3 bg-hoverBlack p-2 ease-in duration-200 rounded-md flex-wrap items-center w-full">
            <div className={`${isOnline ? 'online' : ''} avatar  `}>
              <div className="w-8 h-8 rounded-full">
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
          <div className="flex-grow"></div> 
          <SendInput />
        </div>
      ) : (
        <div className="flex justify-center items-center flex-col h-full">
          <div> <img className="h-40 " src={authUser?.profilePhoto} alt="" /></div>
          <div className="h-9"></div>
          <h1 className="text-4xl font-bold text-gray-700">
            Welcome , <span className="text-indigo-600">{authUser?.fullName}</span>! 🎉
          </h1>
          <h3 className="text-xl text-zinc-500 mt-4"> Message Your friend and get Updates</h3>
        </div>
      )}
    </>
  );
}
