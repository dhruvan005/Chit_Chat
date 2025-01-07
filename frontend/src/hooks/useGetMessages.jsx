import { useEffect } from 'react'
import axios from "axios"
import { useDispatch, useSelector } from 'react-redux';
import { setMessages } from "../redux/messageSlice"

export default function useGetMessages () {
    const dispatch = useDispatch()
    const { selectedUser } = useSelector((store) => store.user)
    const id = selectedUser?._id

    useEffect(() => {
        let isSubscribed = true; // For cleanup

        const fetchMessages = async () => {
            if (!id) return;
            
            try {
                axios.defaults.withCredentials = true;
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/message/${id}`)
                
                if (isSubscribed) {
                    dispatch(setMessages(response.data || [])) // Ensure we always have an array
                }
            } catch (error) {
                console.error("Error fetching messages:", error);
                if (error?.response?.data?.message) {
                    console.error(error.response.data.message);
                }
            }
        }

        fetchMessages()

        return () => {
            isSubscribed = false;
        }
    }, [id, dispatch])
}

// import React, { useEffect } from 'react'
// import axios from "axios";
// import {useSelector,useDispatch} from "react-redux";
// import { setMessages } from '../redux/messageSlice';

// const useGetMessages = () => {
//     const {selectedUser} = useSelector(store=>store.user);
//     const dispatch = useDispatch();
//     const id = selectedUser?._id

//     useEffect(() => {
//         const fetchMessages = async () => {
//             try {
//                 axios.defaults.withCredentials = true;
//                 const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/message/${id}`);
//                 dispatch(setMessages(res.data))
//             } catch (error) {
//                 console.log(error);
//             }
//         }
//         fetchMessages();
//     }, [selectedUser?._id,setMessages]);
// }

// export default useGetMessages