import React, { useEffect , useState} from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import {setSelectedUser} from "../redux/userSlice"


export default function useGetMessage() {
    const [hasFetched, setHasFetched] = useState(false);
    const dispatch = useDispatch()
    const { selectedUser} = useSelector((store) => store.user)
    useEffect(() => {
        const featchMessage = async () => {
            try {  

                axios.defaults.withCredentials = true;
                const response = await axios.get(`http://localhost:3000/message/${selectedUser?._id}`)
                // dispatch(setSelectedUser(response.data))
                console.log(response);
            } catch (error) {
                // toast.error(error.response.data.message);
                console.log(error);
            }   
        }
        if (!hasFetched) {
            featchMessage();
            setHasFetched(true);
        }
    }, [dispatch ,hasFetched])
}
