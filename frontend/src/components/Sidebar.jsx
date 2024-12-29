import React from 'react'
import OtherUsers from './OtherUsers'
import { useNavigate } from "react-router-dom"
import toast from 'react-hot-toast';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/userSlice';

export default function Sidebar() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = async () => {
        try {

            const res = await axios.get(`http://localhost:3000/user/logout`)
            // console.log("logout", res);

            if (res.status === 200) {
                toast.success(res.data.message);

                // Dispatch logout action to Redux store
                
                // Navigate to login page
                navigate('/login');
                dispatch(logout());
            }
        }
        catch (error) {
            toast.error(error.response.data.message);
            console.log(error);
        }
    }

    return (
        <div className="flex flex-col h-[60vh] ">
            <div className="pt-5">

                <form action="">

                    <label className="input input-bordered flex items-center gap-2">
                        <input type="text" className="grow" placeholder="Search" />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 16 16"
                            fill="currentColor"
                            className="h-4 w-4 opacity-70">
                            <path
                                fillRule="evenodd"
                                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                                clipRule="evenodd" />
                        </svg>
                    </label>

                </form>
                <div className="divider divider-info pb-3"></div>


            </div>
            <OtherUsers />
            <div>
                <button onClick={logoutHandler} className="btn btn-outline btn-wide "> Logout</button>
            </div>
        </div>

    )
}
