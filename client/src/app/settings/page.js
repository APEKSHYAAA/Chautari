'use client'
import React, {useRef} from 'react'
 

const page = () => {
  const inputRef = useRef(null)

    const saveavatar = (e) =>{
        console.log(inputRef.current.files[0])
    }
  return (
    <>
        <div>Change Full Name </div>
        <div>Change password </div>
        <div>Change avatar
             <input ref = {inputRef} type = 'file' onChange = {saveavatar}></input>
        </div>

    </>

  )
}

export default page