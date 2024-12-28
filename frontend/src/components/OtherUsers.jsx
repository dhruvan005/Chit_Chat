import React, { useEffect } from 'react'
import SingleUser from './SingleUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

export default function OtherUsers() {
    useGetOtherUsers()
    const navigate = useNavigate()

    useEffect(() => {
        try {

            const token = Cookies.get('token');
            if (!token) {
                // toast.error('Please login. Unauthenticated');
                navigate('/login');
            }
        } catch (error) {
            console.log(error);
            
           
        }

    }, [navigate]);

    const logoutHandler = async () => {
        try {

            const res = await axios.get(`http://localhost:3000/user/logout`)
            console.log("logout", res);

            if (res) {

                toast.success(res.data.message);
                navigate("/login")

            }
        }
        catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    const { otherUser } = useSelector(store => store.user);

    if (!otherUser || otherUser.length === 0) return <p>No users found.</p>;
    // console.log("otherUser:", otherUser);


    return (
        <div className="h-[80vh] ">
            <div className="flex flex-col gap-6  h-[60vh] overflow-y-auto ">

                {otherUser.map((user, index) => (
                    <SingleUser key={user._id || index} user={user} /> // Fallback key
                ))}
            </div>
            <div className='h-5'></div>
            <div>
                <button onClick={logoutHandler} className="btn btn-outline btn-wide "> Logout</button>
            </div>
        </div>
    )
}
