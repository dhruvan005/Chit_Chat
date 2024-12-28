import React, { useEffect , useState} from 'react'
import axios from "axios"
import toast from 'react-hot-toast';
import { useDispatch } from "react-redux"
import { setOtherUser } from '../redux/userSlice';


export default function useGetOtherUsers() {
    const [hasFetched, setHasFetched] = useState(false);
    const dispatch = useDispatch()
    useEffect(() => {
        const featchOtherUsers = async () => {
            try {
                // when we are using isAuthenticated middleware at that time we have to give withCredentials = true  

                axios.defaults.withCredentials = true;
                const res = await axios.get(`http://localhost:3000/user/`)
                dispatch(setOtherUser(res.data.otherUsers))
                // console.log(res);
            } catch (error) {
                toast.error(error.response.data.message);
                console.log(error);
            }
        }
        if (!hasFetched) {
            featchOtherUsers();
            setHasFetched(true);
        }
    }, [dispatch ,hasFetched])
}
