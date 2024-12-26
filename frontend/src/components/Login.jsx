import { useState } from "react";
import React from 'react';
import { Link } from 'react-router-dom';


export default function Login() {

  const [user, setUser] = useState({
    email: "",
    password: "",
  })

  const submitHandler = (e) => {
    e.preventDefault()

    console.log(user);

    setUser({
      email: "",
      password: "",
    })
  }

  return (
    <div className="">
      <div className=" pb-8 pt-8 p-5 min-w-96 bg-gray-900 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 ">

        <h1 className="text-3xl text-zinc-200 font-bold text-center ">Login</h1>
        <div className='h-8'></div>
        <form className="flex flex-col gap-3" method='post' onSubmit={submitHandler} >

          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path
                d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>

            <input
              required
              type="text"
              value={user.email}
              className="grow"
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
                clipRule="evenodd" />
            </svg>
            <input
              required
              type="password"
              value={user.password}
              className="grow"
              name="password"
              placeholder="Password"
              onChange={(e) => setUser({ ...user, password: e.target.value })}
            />
          </label>
          <div className="h-5">
          </div>

          <button className='btn bg-slate-700 text-white'> Login  </button>
        </form>

        <div className="h-9">
        </div>

           <Link to="/register">
        <div className="flex justify-center items-center h-2">
           <button className="btn btn-outline text-center p-2">
              Don't have an Account / SignUp
            </button> 
        </div>
            </Link>

      </div>
    </div>
  )
}
