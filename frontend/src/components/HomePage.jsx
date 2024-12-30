
import MessageContainer from './MessageContainer';
import Sidebar from './Sidebar';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { clearSelectedUser } from '../redux/userSlice';

export default function HomePage() {

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(clearSelectedUser());
  }, [dispatch]);
  return (
    <div className="flex items-evenly pl-6 pr-6  h-[95vh] w-[100vw] rounded-lg overflow-hidden">
      <div className="flex flex-col w-3/10 ">
        <Sidebar />
      </div>
      <div className="bg-neutral-500 divider divider-horizontal w-1"></div>
      <div className="flex flex-col w-[75vw] h-full">
        <MessageContainer />
      </div>
    </div>
  );
}
