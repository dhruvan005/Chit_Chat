// import MessageContainer from './MessageContainer';
// import Sidebar from './Sidebar';
// import React, { useEffect } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { clearSelectedUser } from '../redux/userSlice';

// export default function HomePage() {
//   const dispatch = useDispatch();
//   const { authUser } = useSelector((store) => store.user);

//   console.log("on homepage");
//   console.log("authUser:", authUser);


//   useEffect(() => {
//     dispatch(clearSelectedUser());
//   }, [dispatch]);

//   return (
//     <div>
//     <div className="flex items-evenly pl-6 pr-6  h-[95vh] w-[100vw] rounded-lg overflow-hidden">
//       <div className="flex flex-col w-[25vw] ">
//         <Sidebar />
//       </div>
//       <div className="bg-neutral-500 divider divider-horizontal w-1"></div>
//       <div className="flex flex-col w-[75vw] h-full">
//         <MessageContainer />
//       </div>
//     </div>
//     </div>
//   );
// }

import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import MessageContainer from './MessageContainer'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const HomePage = () => {
  const { authUser } = useSelector(store => store.user);
  const navigate = useNavigate();
  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, []);
  return (
    <div className='flex rounded-lg  h-full overflow-hidden bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0'>
      <div className="w-[20vw]">
      <Sidebar />
      </div>

      <div className="bg-neutral-500 divider  divider-horizontal w-[1px]"></div>
      
      <div className="w-[75vw] p-1">
      <MessageContainer />
      </div>
    </div>
  )
}

export default HomePage