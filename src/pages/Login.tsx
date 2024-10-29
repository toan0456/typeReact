import React from 'react'
import { authForm, formProduct } from '../interface/type'
import { useForm } from 'react-hook-form'
import z from "zod"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

// const schema = z.object({
//   name: z.string().min(4),
//   price: z.number().min(0),
//   desc: z.string().optional()
// })
const Login = () => {

  const {
    register,
    handleSubmit,
    reset,
    formState
  } = useForm<authForm>()

  const nav = useNavigate()

  const onSubmit = async (dataAuth: authForm) => {
    // console.log({data})
    const {data} = await axios.get('http://localhost:3000/users');
    // const users = response.data;
    const checkUser = data.find((user: any) => user.email === dataAuth.email && user.password === dataAuth.password);
    if (checkUser) {
      alert('Đăng nhập thành công!');
      nav('/admin');
    } else {
      alert('Email hoặc mật khẩu không đúng!');
    }

  }

  return (
    <>
      <h1>Đăng nhập</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor="">Email</label>
          <input type="text" {...register("email", { required: true })} className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor="">Mật khẩu</label>
          <input type="password" {...register("password")} className='form-control' />
        </div>
        <div className='mb-3'>
          <button>Đăng nhập</button>
        </div>
      </form>
    </>
  )
}

export default Login