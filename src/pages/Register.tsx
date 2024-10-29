import React from 'react'
import { IAuth } from '../interface/type'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
})

const Register = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm<IAuth>({
    resolver: zodResolver(schema)
  })
  const nav = useNavigate()

  const onSubmit = async (dataUser: IAuth) => {
    try {
      const { data } = await axios.get('http://localhost:3000/users');
      // const users = response.data;
      const checkEmail = data.some((user: IAuth) => user.email === dataUser.email);

      if (checkEmail) {
        alert('Email đã tồn tại! Vui lòng nhập email khác.');
        return;
      }

      await axios.post(`http://localhost:3000/users`, dataUser)
      alert("Đăng ký thành công!")
      nav("/login")
    } catch (error) {
      alert("Đăng ký thất bại!")
    }
  }

  return (
    <>
      <h1>Đăng ký</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor="email">Email</label>
          <input type="email" {...register('email', { required: true })} className='form-control' />
          {errors.email && <p>{errors.email.message}</p>}
        </div>
        <div className='mb-3'>
          <label htmlFor="password">Mật khẩu</label>
          <input type="password" {...register("password", { required: true })} className='form-control' />
          {errors.password && <p>{errors.password.message}</p>}
        </div>
        <div className='mb-3'>
          <button type="submit">Đăng ký</button>
        </div>
      </form>
    </>
  )
}

export default Register
