'use client'
import React , {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useDispatch } from 'react-redux';
import { loginUser } from '@/redux/reducerSlices/userSlice'
import {Input, Button} from "@nextui-org/react";
import FormSection from '@/components/FormSection/page';


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


const Login = ({children}) => {
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
      const res = await fetch('http://localhost:8000/login/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputFields)
      })
      const data = await res.json()
      if(res.status == 200){
        dispatch(loginUser(data))
       router.push('/main')
      }
      toast( data.msg,
          {
            icon: res.status == 200 ? '✅' : '❌',
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
  return(
    
        <FormSection>
        <h1 className='mb-4 '>Login </h1>
        <form onSubmit={formik.handleSubmit}>
        
        <Input
        id="email"
          label="Email"
          name="email"
          onChange={ formik.handleChange}
          value={formik.values.email}
          placeholder="Enter Email"
          labelPlacement="outside"
        />
       {formik?.errors.email}
          <br/>
          <Input
          type="password"
          name="password"
          value={formik.values.password}
          onChange={ formik.handleChange}
          label="password"
          placeholder="Enter password"
          labelPlacement="outside"
        />
       {formik?.errors.password}
          <br/>
          <Button  type="submit" color="danger" variant="flat">
        Login
      </Button>   
        </form>
        <br/> 
        {children}
        </FormSection>
 
  
)}

export default Login


