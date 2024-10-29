import React, { useEffect } from 'react'
import { formProduct } from '../interface/type'
import { get, useForm } from 'react-hook-form'
import z from "zod"
import { useParams } from 'react-router-dom'
import axios from 'axios'

type id = number | string

type Props = {
  onEdit: (data: formProduct, id: id) => void
}
// const schema = z.object({
//   name: z.string().min(4),
//   price: z.number().min(0),
//   desc: z.string().optional()
// })
const Edit = ({ onEdit }: Props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState
  } = useForm<formProduct>()

  const { id } = useParams()

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/product/${id}`)
      reset(data)
    })()
  }, [])

  const onSubmit = (data: formProduct) => {
    // console.log({data})
    onEdit(data, id as number | string);
  }

  return (
    <>
      <h1>Cập nhật sản phẩm</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3'>
          <label htmlFor="">Tên sản phẩm</label>
          <input type="text" {...register("name", { required: true })} className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor="">Giá sản phẩm</label>
          <input type="number" {...register("price", { valueAsNumber: true })} className='form-control' />
        </div>
        <div className='mb-3'>
          <label htmlFor="">Mô tả sản phẩm</label>
          <input type="text" {...register("desc")} className='form-control' />
        </div>
        <div className='mb-3'>
          <button>Cập nhật sản phẩm</button>
        </div>
      </form>
    </>
  )
}

export default Edit