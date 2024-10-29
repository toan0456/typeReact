import React from 'react'
import { formProduct } from '../interface/type'
import { useForm } from 'react-hook-form'
import z from "zod"

type Props = {
  onAdd: (data: formProduct) => void
}
// const schema = z.object({
//   name: z.string().min(4),
//   price: z.number().min(0),
//   desc: z.string().optional()
// })
const Add = ({ onAdd }: Props) => {

  const {
    register,
    handleSubmit,
    reset,
    formState
  } = useForm<formProduct>()

  const onSubmit = (data: formProduct) => {
    // console.log({data})
    onAdd(data)
  }

  return (
    <>
      <h1>Thêm mới sản phẩm</h1>
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
          <button>Thêm mới sản phẩm</button>
        </div>
      </form>
    </>
  )
}

export default Add