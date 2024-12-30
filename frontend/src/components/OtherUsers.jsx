import React, { useEffect } from 'react'
import SingleUser from './SingleUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import toast from 'react-hot-toast';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from "react-router-dom"
import Cookies from 'js-cookie';

export default function OtherUsers() {
    const { loading } = useGetOtherUsers();
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



    const { otherUser } = useSelector(store => store.user);

    if (loading) {

        return (
            <div>
                <div className="h-9"> </div>
                <p>Loading...</p>

            </div>

        )

    }
    else {

        if (!otherUser || otherUser.length === 0) return <p>No users found.</p>;
    }



    return (
        <div className="h-[50vh] ">
            <div className="flex flex-col gap-4  h-[50vh] overflow-y-auto ">

                {otherUser.map((user, index) => (
                    <SingleUser key={user._id || index} user={user} />
                ))}
            </div>
            <div className='h-5'></div>

        </div>
    )
}
