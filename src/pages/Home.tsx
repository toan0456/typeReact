import React from 'react'
import { formProduct, IProduct } from '../interface/type'
import { Link } from 'react-router-dom'

type Props = {
    product: IProduct[],
    onDelete: (id: number | string) => void
}

const Home = ({ product, onDelete }: Props) => {
    return (
        <>
            <h2>Home</h2>
            <table className='table'>
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Tên</th>
                        <th>Giá</th>
                        <th>Mô tả</th>
                        <th>Thao tác</th>
                    </tr>
                </thead>
                <tbody>

                    {product.map((item, index) => (
                        <tr key={item.id}>
                            <td>{index + 1}</td>
                            <td>{item.name}</td>
                            <td>{item.price}</td>
                            <td>{item.desc}</td>
                            <td>
                                <Link to={`/admin/edit/${item.id}`}><button>Sửa</button></Link>
                                <button onClick={() => onDelete(item.id as any)}>Xóa</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default Home