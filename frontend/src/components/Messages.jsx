import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessage from '../hooks/useGetMessages'
import { useSelector } from 'react-redux'


export default function Messages() {

  useGetMessage()

  const { messages } = useSelector(store => store.message)
  if (!Array.isArray(messages)) return null;
  
    return (
      <div className="h-[60vh] overflow-y-auto">

{
        messages.map((message) => {
          return (
            <SingleMessage key={message._id} message={message} /> 
          )
        })
      }
       
      </div>
    )
}
