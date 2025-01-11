import React, { useState } from 'react'
import OtherUsers from './OtherUsers';
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setAuthUser, setOtherUsers, setSelectedUser } from '../redux/userSlice';
import { setMessages } from '../redux/messageSlice';
import { logout } from '../redux/userSlice'; // Adjust the import path as needed


const Sidebar = () => {
    const [search, setSearch] = useState("");

    const { otherUsers } = useSelector(store => store.user);
    const dispatch = useDispatch();

    const navigate = useNavigate();


    const logoutHandler = async () => {
        try {
            await axios.get(`${import.meta.env.VITE_API_BASE_URL}/user/logout`, {
                withCredentials: true
            });
            localStorage.removeItem('token');
            toast.success('Logged out successfully');
            dispatch(logout());
            navigate("/login");
        } catch (error) {
            toast.error(error.response?.data?.message || 'Logout failed');
            console.error(error);
        }
    };
    const searchSubmitHandler = (e) => {
        e.preventDefault();
        const conversationUser = otherUsers?.find((user) => user.fullName.toLowerCase().includes(search.toLowerCase()));
        if (conversationUser) {
            dispatch(setOtherUsers([conversationUser]));
        } else {
            toast.error("User not found!");
        }
    }

    return (
        <div className="flex flex-col h-full pb-6 ">
            <div className="pt-5">
                <form action="" onSubmit={searchSubmitHandler}>
                    <label className=" input border-4 flex items-center gap-2 w-full justify-between">
                        <div>
                            <input
                                type="text"
                                className="w-full "
                                placeholder="Search"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <div>
                            <button onClick={searchSubmitHandler}>
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
                            </button>
                        </div>
                    </label>
                </form>
                <div className="divider divider-info pb-3"></div>
            </div>
            <OtherUsers />
            <div className=""></div>
            <div className='w-full'>
                <button onClick={logoutHandler} className="btn btn-outline w-full "> Logout</button>
            </div>
        </div>
    );
}

export default Sidebar