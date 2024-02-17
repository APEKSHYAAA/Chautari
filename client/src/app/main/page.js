'use client'
import React from 'react'
import Navbar from '../../components/navbar/page'
import { useSelector } from 'react-redux'


const Main = () => {
    
    return(
    <>
       
        <Navbar/>  
        <div className="flex fixed top-[7.5vh] left-0 w-screen h-screen space-x-4 ">
        <div className="w-full max-w-[350px] border-small px-1 py-2 rounded-medium border-gray-300 dark:border-default-100  hidden lg:block">
                <div className="text-center text-danger font-bold p-4">Friends</div>
            </div>
            <div className="w-full h-[93vh]  border border-gray-300 rounded-lg flex flex-col justify-between sm:w-screen">
                <div className="overflow-auto text-danger p-4  ">Chat messages go here</div>     
                    <div className="flex p-4">
                    <input className="flex-grow rounded-lg border p-2 mr-4 input input-bordered w-24  md:w-auto" type="text" placeholder="Type a message" />
                    <button className="rounded-lg bg-white text-danger border border-gray-300 p-2 hover:bg-danger hover:text-white">Send</button>                </div>
            </div>
        </div>
        
    </>
    )
}

export default Main;
