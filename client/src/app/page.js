'use client'
import React from "react";
import {Button} from "@nextui-org/react";
import { useRouter } from 'next/navigation';
import { UseSelector } from "react-redux";

const home = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/register');
  };
  const handlelogin = () => {
    router.push('/login');
  };

  return (
    <div>
       <h1 style={{color: "black", fontSize: "20px"}}>Welcome to the Chat App</h1>
       <Button onClick={handleSignup} type="submit" color="primary" variant="flat">
        Signup
      </Button>  
       <br/>
       <br/>
      <Button onClick={handlelogin} type="submit" color="primary" variant="flat">
       login
      </Button>      
      </div>
  )}
export default home