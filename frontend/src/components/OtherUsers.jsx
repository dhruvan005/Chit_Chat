import React from 'react'
import SingleUser from './SingleUser'
import useGetOtherUsers from '../hooks/useGetOtherUsers'
import toast from 'react-hot-toast';

export default function OtherUsers() {
    useGetOtherUsers()
    return (
        <div className="h-[80vh] ">
            <div className="flex flex-col gap-6  h-[60vh] overflow-y-auto ">

                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>
                <SingleUser/>


               


            </div>
            <div className='h-5'></div>
            <div> 
                <button className="btn btn-outline btn-wide "> Logout</button>
                </div>
        </div>
    )
}
