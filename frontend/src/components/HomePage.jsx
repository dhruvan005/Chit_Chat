import React from 'react';
import MessageContainer from './MessageContainer';
import Sidebar from './Sidebar';

export default function HomePage() {
  return (
    <div className="flex items-evenly pl-6 pr-6 border h-[80vh] w-[80vw] rounded-lg overflow-hidden">
      <div className="flex flex-col w-3/10">
        <Sidebar />
      </div>
      <div className="bg-neutral-500 divider divider-horizontal w-1"></div>
      <div className="flex flex-col w-[70vw]  h-full">
        <MessageContainer />
      </div>
    </div>
  );
}