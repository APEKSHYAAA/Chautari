'use client'
import { useRouter } from 'next/navigation';
import {Input, Button} from "@nextui-org/react";
const login = () => {
  return (
    <div>
    <div className='center'>
    <h1 >Login</h1>
    </div>
    <form >
        <Input
        id="email"
          label="Email"
          name="email"
          placeholder="enter email"
          labelPlacement="outside"
        />
          <br/>
          <Input
          type="password"
          name="password"
          label="password"
          placeholder="enter password"
          labelPlacement="outside"
        />
          <br/>
          <Button  type="submit" color="primary" variant="flat">
        Login
      </Button>  
        </form>
  </div>
)
}
export default  login






























