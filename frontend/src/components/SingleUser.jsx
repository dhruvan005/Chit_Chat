import React from 'react'

const SingleUser = ({ user }) => {

    // console.log("user inside Single user" , user);

    return (
        <div className="max-h-15 gap-5 flex  hover:bg-hoverBlack p-1 ease-in duration-200 rounded-md flex-wrap items-center">
            <div className="avatar online " >
                <div className="w-12 h-12 rounded-full" >
                    <img src={user.profilePhoto} alt="" />
                </div>
            </div>
            <div className="" >
                <div className="text-xl" >
                    <p>{user.fullName}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleUser