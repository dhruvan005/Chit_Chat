import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";


const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    const { loading } = useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    // console.log("otherUser in s" , otherUsers)

    if (loading) {

        return (
            <div>
                <div className="h-9"> </div>
                <p>Loading...</p>

            </div>

        )

    }
    else {

        if (!otherUsers || otherUsers.length === 0) return <p>No users found.</p>;
    }

   
     
    return (
        <div className='overflow-auto flex-1'>
            {
                otherUsers?.map((user)=>{
                    return (
                        <OtherUser key={user._id} user={user}/>
                    )
                })
            }
            
        </div>
    )
}

export default OtherUsers
