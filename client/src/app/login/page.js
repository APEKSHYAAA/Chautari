'use client'
import React , {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {Input, Button} from "@nextui-org/react";
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/reducerSlices/userSlice'


const SignupSchema = Yup.object().shape({
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
});


const Login = () => {
  const router = useRouter()
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues: {
      email: '',
      password:''
    },
    validationSchema:SignupSchema,
    onSubmit: values => {
      handleLogin(values);
      formik.resetForm()
    }
  });
  const handleLogin = async(inputFields)=>{
    try{
      const res = await fetch('http://localhost:5000/login/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputFields)
      })
      const data = await res.json()
      if(res.status == 201){
        dispatch(loginUser(data))
        router.push('/main')
      }
      console.log(1)
      toast( data.msg,
          {
            icon: res.status == 201 ? '✅' : '❌',
            style: {
              borderRadius: '10px',
              background: '#333',
              color: '#fff',
            },
          }
        );
    }catch(err){
      console.log(err)
    }
  
  }
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
export default  Login






























