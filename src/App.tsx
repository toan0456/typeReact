import { Navigate, Route, Routes, useNavigate } from 'react-router-dom'
import './App.css'
import Home from './pages/Home'
import Add from './pages/Add'
import Edit from './pages/Edit'
import Register from './pages/Register'
import Login from './pages/Login'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { formProduct, IProduct } from './interface/type'

function App() {

  const [products, setProducts] = useState([])

  const nav = useNavigate()

  useEffect(() => {
    (async () => {
      const { data } = await axios.get(`http://localhost:3000/product`)
      setProducts(data)
    })()
  }, [])

  const onAdd = async (productdata: formProduct) => {
    const { data } = await axios.post(`http://localhost:3000/product`, productdata)
    const newP = await axios.get(`http://localhost:3000/product`)
    setProducts(newP.data);
    alert("Thêm sản phẩm thành công")
    nav('/admin')
  }

  const onEdit = async (productdata: IProduct) => {
    const { data } = await axios.patch(`http://localhost:3000/product/${productdata.id}`, productdata)
    const newP = await axios.get(`http://localhost:3000/product`)
    setProducts(newP.data);
    alert("Thêm sản phẩm thành công")
    nav('/admin')
  }

  const onDelete = async (id: string | number) => {
    const { data } = await axios.delete(`http://localhost:3000/product/${id}`)
    const newP = await axios.get(`http://localhost:3000/product`)
    setProducts(newP.data);
    alert("Thêm sản phẩm thành công")
    nav('/admin')
  }


  return (
    <>
      <Routes >
        <Route path='/admin' element={<Home product={products} onDelete={onDelete} />} />
        <Route path='/admin/add' element={<Add onAdd={onAdd} />} />
        <Route path='/admin/edit/:id' element={<Edit onEdit={onEdit} />} />

        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />

        <Route path='/' element={<Navigate to={'/admin'} />} />
      </Routes>
    </>
  )
}

export default App
