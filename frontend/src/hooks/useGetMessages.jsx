// import React, { useEffect, useState } from 'react'
// import axios from "axios"
// import toast from 'react-hot-toast';
// import { useDispatch, useSelector } from 'react-redux';
// import { setMessages } from "../redux/messageSlice"


// export default function useGetMessage() {
//     const dispatch = useDispatch()
//     const { selectedUser } = useSelector((store) => store.user)
//     const id = selectedUser?._id
//     // console.log("ID: ", id);
//     useEffect(() => {
//         if (id) {
//             const featchMessage = async () => {
//                 try {

//                     axios.defaults.withCredentials = true;
//                     const response = await axios.get(`http://localhost:3000/message/${id}`)
//                     // console.log(response);
//                     dispatch(setMessages(response.data))
//                 } catch (error) {
//                     // toast.error(error.response.data.message);
//                     console.log(error);
//                 }
//             }
//             featchMessage()
//         }

//     }, [id, dispatch])
// }


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
                const response = await axios.get(`http://localhost:3000/message/${id}`)
                
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