import React from 'react'
import SingleMessage from './SingleMessage'
import useGetMessage from '../hooks/useGetMessages'

export default function Messages() {

useGetMessage()
  return (
    <div className="h-[60vh] overflow-y-auto"> 
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
        <SingleMessage/>
    </div>
  )
}
