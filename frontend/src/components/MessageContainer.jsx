import React from 'react';
import SendInput from "./SendInput"
import Messages from './Messages';
import { useSelector } from 'react-redux';

export default function MessageContainer() {

    const { selectedUser  , authUser } = useSelector((store) => store.user)

    // console.log(selectedUser);
   
    return (
        <>
            {
                selectedUser !== null ? (
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

                        <SendInput />
                    </div>
                ) : (
                    <div className="flex justify-center items-center flex-col h-full">
                        <div> <img className="h-40 " src={authUser?.profilePhoto} alt="" /></div>
                        <div className="h-9"></div>
                    <h1 className="text-6xl font-bold text-gray-700">
                        Welcome back, <span className="text-indigo-600">{authUser.fullName}</span>! 🎉
                    </h1>
                    <h3 className="text-2xl text-zinc-500 mt-4"> Message Your friend and get Updates or do Gooossip  </h3>
                </div>
                )
            }



        </>
    );
}
