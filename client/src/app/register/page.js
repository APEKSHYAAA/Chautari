'use client'
import React , {useState} from 'react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {Input, Button} from "@nextui-org/react";
import { useFormik } from 'formik';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
   .required('Required'),
  email: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

});


const Register = () => {
  const router = useRouter()
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password:''
    },
    validationSchema:SignupSchema,
    onSubmit: values => {
      handleRegister(values);
      formik.resetForm()
    }
  });
  const handleRegister = async(inputFields)=>{
    try{
      const res = await fetch('http://localhost:5000/register/',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(inputFields)
      })
      const data = await res.json()

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
        if(res.status == 200) router.push('/login')
    }catch(err){
      console.log(err)
    }
  
  }
  return(
  <div>
    <div className='center'>
    <h1 >Signup</h1>
    </div>
    <form onSubmit={formik.handleSubmit}>
    <br/>
    <Input
         id = "firstName"
          label="First Name"
          name="firstName"
          onChange={formik.handleChange}
          value={formik.values.firstName}
          placeholder="enter first name"
          labelPlacement="outside"
        />
          {formik?.errors.firstName}
          <br/>
          <Input
          id="lastName"
          label="Last Name"
          name="lastName"
          onChange={ formik.handleChange}
          value={formik.values.lastName}
          placeholder="enter last name"
          labelPlacement="outside"
        />
        <Input
        id="email"
          label="Email"
          name="email"
          onChange={ formik.handleChange}
          value={formik.values.email}
          placeholder="enter email"
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
          placeholder="enter password"
          labelPlacement="outside"
        />
       {formik?.errors.password}
          <br/>
          <Button  type="submit" color="primary" variant="flat">
        Register
      </Button>  
        </form>
  </div>
)}

export default Register