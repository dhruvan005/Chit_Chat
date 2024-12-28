import React, { useEffect } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { setOtherUser } from '../redux/userSlice';


export default function useGetOtherUsers() {

    const dispatch = useDispatch()
    useEffect(() => {
        const featchOtherUsers = async () => {
            try {
                // when we are using isAuthenticated middleware at that time we have to give withCredentials = true  

                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:3000/user/`)
                dispatch(setOtherUser(res.data))
                console.log(res);
            } catch (error) {
                // toast.error('Failed to fetch other users');
                console.log(error);
            }
        }
        featchOtherUsers()

    }, [])
}
