import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedUser} from "../redux/userSlice"
import { clearSelectedUser } from '../redux/userSlice';

const SingleUser = ({ user }) => {
    const dispatch = useDispatch()
    // console.log("user inside Single user" , user);
    
    const { selectedUser} = useSelector((store) => store.user)
    const  selectedUserHandler = (user) =>{

        // console.log("user " ,user);
            dispatch(setSelectedUser(user))
    }

    // console.log("user.id" , user._id);
    // console.log('selectedUser', selectedUser);
    return (
        <div 
        className={`
            ${ selectedUser && selectedUser._id === user._id ? 'bg-hoverBlack' : '' }
            max-h-15 gap-5 flex  hover:bg-hoverBlack p-1 ease-in duration-200 rounded-md flex-wrap items-center`} 
        onClick={() => selectedUserHandler(user)}
        >
            <div className="avatar online " >
                <div className="w-12 h-12 rounded-full" >
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