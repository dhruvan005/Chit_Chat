import React , { useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Signup from './components/Signup'
import HomePage from './components/HomePage'
import Login from './components/Login'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import  io  from 'socket.io-client';



const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/register",
    element: <Signup />
  },
  {
    path: "/login",
    element: <Login />
  }
])

function App() {
  const { authUser } = useSelector(store => store.user)
  const [sockets, setSockets] = useState(null)

  useEffect(() => {
    if (authUser) {
      const socket = io('http://localhost:3000', {
        transports: ['websocket'],
      });
      socket.on('connect', () => {
        console.log('Connected to the server with ID:', socket.id);
      });
  
      socket.on('connect_error', (err) => {
        console.error('Connection error:', err);
      });
  
      socket.on('disconnect', (reason) => {
        console.warn('Disconnected from server:', reason);
      });
  
      setSockets(socket);
      return () => {
        socket.disconnect();
      };
    }
  }, [authUser])

  return (
    <div >
      <RouterProvider router={router} />

    </div>
  )
}

export default App
