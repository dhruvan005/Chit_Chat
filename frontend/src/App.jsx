// import React, { useEffect } from 'react';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import io from 'socket.io-client';
// import { setSocket } from './redux/socketSlice';
// import { setOnlineUsers } from './redux/userSlice';
// import HomePage from './components/HomePage';
// import Login from './components/Login';
// import Signup from './components/Signup';

// const SOCKET_URLS = {
//   production: 'https://chit-chat-r32l.onrender.com',
//   development: 'http://localhost:3000'
// };

// function App() {
//   const { authUser } = useSelector((store) => store.user);
//   const { socket } = useSelector((store) => store.socket);
//   const dispatch = useDispatch();

//   useEffect(() => {
//     if (authUser && !socket) {
//       const socketUrl = process.env.NODE_ENV === 'production' ? SOCKET_URLS.production : SOCKET_URLS.development;
//       const socketio = io(socketUrl, {
//         transports: ['websocket'],
//         query: {
//           userId: authUser.id,
//         },
//       });

//       dispatch(setSocket(socketio));

//       socketio.on('getOnlineUsers', (onlineUsers) => {
//         dispatch(setOnlineUsers(onlineUsers));
//       });

//       return () => {
//         socketio.close();
//         dispatch(setSocket(null));
//       };
//     }
//   }, [authUser]);

//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/register" element={<Signup />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;


import Signup from './components/Signup';
import './App.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import HomePage from './components/HomePage';
import Login from './components/Login';
import { useEffect, useState } from 'react';
import {useSelector,useDispatch} from "react-redux";
import io from "socket.io-client";
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';


const router = createBrowserRouter([
  {
    path:"/",
    element:<HomePage/>
  },
  {
    path:"/register",
    element:<Signup/>
  },
  {
    path:"/login",
    element:<Login/>
  },

])

function App() { 
  const {authUser} = useSelector(store=>store.user);
  const {socket} = useSelector(store=>store.socket);
  const dispatch = useDispatch();

  useEffect(()=>{
    if(authUser){
      const socketio = io(`${import.meta.env.VITE_API_BASE_URL}`, {
          query:{
            userId:authUser._id
          }
      });
      dispatch(setSocket(socketio));

      socketio?.on('getOnlineUsers', (onlineUsers)=>{
        dispatch(setOnlineUsers(onlineUsers))
      });
      return () => socketio.close();
    }else{
      if(socket){
        socket.close();
        dispatch(setSocket(null));
      }
    }

  },[authUser]);

  return (
    <div className="p-4 h-screen flex items-center justify-center">
      <RouterProvider router={router}/>
    </div>

  );
}

export default App;