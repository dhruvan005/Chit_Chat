import { useState } from "react";
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/user/login", user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });

      if (res.status === 200) {
        navigate("/");
        toast.success(res.data.message);
        // console.log(res.data);
        dispatch(setAuthUser(res.data))
      }

    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser({
      email: "",
      password: "",
    });
  };

  return (



    <div className="flex justify-center  items-center w-[80vw]  min-h-screen ">
      <div className="w-[100%] max-w-md p-8 bg-slate-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 md:border md:border-slate-500  md:border-slate-500">
        <h1 className="text-4xl text-zinc-200 font-bold text-center mb-6">Login</h1>
        <form className="flex flex-col gap-4" method="post" onSubmit={submitHandler}>




          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              required
              type="text"
              value={user.email}
              className="grow text-white"
              name="email"
              placeholder="Email"
              onChange={(e) => setUser({ ...user, email: e.target.value })}
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                clipRule="evenodd"
              />
            </svg>
            <input
              required
              type="password"
              value={user.password}
              className="grow text-white"
              name="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>


          <button className="btn bg-slate-500 min-w-40 m-auto text-white">Login</button>
        </form>

        <div className="divider divider-error pb-3"></div>
        <div className="pt-3">

          <Link to="/register">
            <div className="flex justify-center items-center h-2">
              <button className="btn btn-outline text-center"> Don't have an Account / SignUp </button>
            </div>
          </Link>
        </div>
      </div>
    </div>



  );
}


