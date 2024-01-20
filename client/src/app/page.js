'use client'
import React from "react";
import { useRouter } from 'next/navigation';
const home = () => {
  const router = useRouter();

  const handleSignup = () => {
    router.push('/register');
  };

  return (
    <div>
       <h1>Welcome to the Chat App</h1>
       <button onClick={handleSignup}>Signup</button>
    </div>
  )}
export default home