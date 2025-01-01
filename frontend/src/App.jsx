import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import io from 'socket.io-client';
import { setSocket } from './redux/socketSlice';
import { setOnlineUsers } from './redux/userSlice';
import Signup from './components/Signup';
import HomePage from './components/HomePage';
import Login from './components/Login';

function App() {
  const { authUser } = useSelector((store) => store.user);
  const { socket } = useSelector((store) => store.socket);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authUser && !socket) {
      const socketio = io('http://localhost:3000', {
        transports: ['websocket'],
        query: {
          userId: authUser.id,
        },
      });

      dispatch(setSocket(socketio));

      socketio.on('getOnlineUsers', (onlineUsers) => {
        dispatch(setOnlineUsers(onlineUsers));
      });

      return () => {
        socketio.close();
        dispatch(setSocket(null));
      };
    }
  }, [authUser]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;