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
               
                const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/message/${id}` ,  {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
                
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
