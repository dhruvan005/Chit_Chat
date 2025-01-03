import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import validator from "validator";



export default function Signup() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    fullName: '',
    username: '',
    email: '',
    password: '',
    conformPassword: '',
    gender: ''
  });

  const submitHandler = async (e) => {
    e.preventDefault();

    // Client-side validation
    if (!user.fullName || !user.username || !user.email || !user.password || !user.conformPassword || !user.gender) {
      toast.error("Some fields are missing");
      return;
    }

    if (!validator.isEmail(user.email)) {
      toast.error("Email is invalid");
      return;
    }

    if (user.password !== user.conformPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await axios.post('http://localhost:3000/user/register', user, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      // console.log(res);
      if (res.status === 200) {
        navigate('/login');
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };

  return (

    <div className="flex justify-center  items-center w-[80vw]  min-h-screen ">
      <div className="w-[100%] max-w-md p-8 bg-slate-600 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 md:border md:border-slate-500">
        <h1 className="text-3xl text-zinc-200 font-bold text-center mb-6">Signup</h1>
        <form className="flex flex-col gap-4" method="post" onSubmit={submitHandler}>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              required
              type="text"
              value={user.fullName}
              onChange={(e) => setUser({ ...user, fullName: e.target.value })}
              name="fullName"
              className="grow text-white"
              placeholder="Fullname"
            />
          </label>

          <label className="input input-bordered flex items-center gap-2">
            <svg
              viewBox="2 -3 28.00 28.00"
              className="w-[20px]"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              stroke="#ffffff"
              transform="matrix(1, 0, 0, 1, 0, 0)rotate(0)">
              <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
              <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round" stroke="#CCCCCC" strokeWidth="1.536">
                <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#7E8390" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
              <g id="SVGRepo_iconCarrier">
                <path d="M16 12C16 14.2091 14.2091 16 12 16C9.79086 16 8 14.2091 8 12C8 9.79086 9.79086 8 12 8C14.2091 8 16 9.79086 16 12ZM16 12V13.5C16 14.8807 17.1193 16 18.5 16V16C19.8807 16 21 14.8807 21 13.5V12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21H16" stroke="#7E8390" strokeWidth="1.056" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
            <input
              required
              type="text"
              name="username"
              value={user.username}
              className="grow text-white"
              placeholder="Username"
              onChange={(e) => setUser({ ...user, username: e.target.value })}
            />
          </label>

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
              className="grow text-white"
              placeholder="Conform Password"
              value={user.conformPassword}
              name="conformPassword"
              onChange={(e) => setUser({ ...user, conformPassword: e.target.value })}
            />
          </label>

          <label className="form-control w-full max-w-xs">
            <div className="label">
              <span className="label-text">Pick a Profile Photo</span>

            </div>
            <input type="file" name="profilePhoto" className="file-input file-input-bordered w-full " />

          </label>

          <div className="flex flex-col sm:flex-row items-center space-x-0 sm:space-x-4 space-y-2 sm:space-y-0">
            <label className="label p-2">Gender</label>
            <div className="flex items-center gap-2">
              <label>Male</label>
              <input
                required
                type="radio"
                name="gender"
                value="male"
                checked={user.gender === 'male'}
                className="radio radio-error"
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
            </div>
            <div className="flex items-center gap-2">
              <label>Female</label>
              <input
                required
                type="radio"
                name="gender"
                value="female"
                className="radio radio-error"
                checked={user.gender === 'female'}
                onChange={(e) => setUser({ ...user, gender: e.target.value })}
              />
            </div>
          </div>

          <button className="btn bg-slate-500 min-w-40 m-auto text-white">Sign Up</button>
        </form>

        <div className="divider divider-error pb-3"></div>
        <div className="pt-3">

          <Link to="/login">
            <div className="flex justify-center items-center h-2">
              <button className="btn btn-netural text-center">Already have an Account / Signin</button>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}