import React, { useEffect, useState } from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { setOtherUser } from '../redux/userSlice';


export default function useGetOtherUsers() {
    const [hasFetched, setHasFetched] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        const featchOtherUsers = async () => {
            setLoading(true)
            try {
                // when we are using isAuthenticated middleware at that time we have to give withCredentials = true  

                axios.defaults.withCredentials = true;
                const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/`)
                dispatch(setOtherUser(res.data.otherUsers))
                // console.log(res);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
            finally {
                setLoading(false);
            }
        }
        if (!hasFetched) {
            featchOtherUsers();
            setHasFetched(true);
        }
    }, [dispatch, hasFetched])
    return { loading }
}
