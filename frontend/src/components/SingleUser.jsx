import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedUser} from "../redux/userSlice"
import { clearSelectedUser } from '../redux/userSlice';

const SingleUser = ({ user }) => {
    const dispatch = useDispatch()
   
    const { selectedUser , onlineUsers } = useSelector((store) => store.user)
    const isOnline = onlineUsers.includes(user._id)
    const  selectedUserHandler = (user) =>{

            dispatch(setSelectedUser(user))
    }


    return (
        <div 
        className={`
            ${ selectedUser && selectedUser._id === user._id ? 'bg-hoverBlack' : '' }
            max-h-15 gap-5 flex w-full hover:bg-hoverBlack p-1 ease-in duration-200 rounded-md flex-wrap items-center`} 
        onClick={() => selectedUserHandler(user)}
        >
            <div className={`${isOnline ? 'online' :''} avatar  `} >
                <div className="w-8 h-8 rounded-full" >
                    <img src={user.profilePhoto} alt="" />
                </div>
            </div>
            <div className="" >
                <div className="text-xl" >
                    <p>{user.fullName}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleUser