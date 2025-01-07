// import React, { useEffect } from 'react'
// import SingleUser from './SingleUser'
// import useGetOtherUsers from '../hooks/useGetOtherUsers'
// import { useSelector } from 'react-redux';
// import { useNavigate } from "react-router-dom"
// import Cookies from 'js-cookie';

// export default function OtherUsers() {
//     const { loading } = useGetOtherUsers();
//     const navigate = useNavigate()

//     useEffect(() => {
//         try {

//             const token = Cookies.get('token');
//             if (!token) {
//                 // toast.error('Please login. Unauthenticated');
//                 navigate('/login');
//             }
//         } catch (error) {
//             console.log(error);
//         }

//     }, [navigate]);



//     const { otherUser } = useSelector(store => store.user);

//     if (loading) {

//         return (
//             <div>
//                 <div className="h-9"> </div>
//                 <p>Loading...</p>

//             </div>

//         )

//     }
//     else {

//         if (!otherUser || otherUser.length === 0) return <p>No users found.</p>;
//     }



//     return (
//         <div className="h-full ">
//             <div className="flex flex-col gap-4  h-full overflow-y-auto ">

//                 {otherUser.map((user, index) => (
//                     <SingleUser key={user._id || index} user={user} />
//                 ))}
//             </div>
//             <div className='h-5'></div>

//         </div>
//     )
// }



import React from 'react'
import OtherUser from './OtherUser';
import useGetOtherUsers from '../hooks/useGetOtherUsers';
import {useSelector} from "react-redux";


const OtherUsers = () => {
    // my custom hook
    useGetOtherUsers();
    const {otherUsers} = useSelector(store=>store.user);
    console.log("otherUser in s" , otherUsers)

    if (!otherUsers) return; // early return in react
     
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
