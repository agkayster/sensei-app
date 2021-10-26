import React from 'react'

const ProductRow = ({ product }) => {
  console.log('new product', product)
  const name = product.stock ? (
    product.name
  ) : (
    <span style={{ color: 'red' }}>{product.name}</span>
  )
  return (
    <tr>
      <td>{product.supplier}</td>
      <td>{name}</td>
      <td>{product.price}</td>
    </tr>
  )
}

export default ProductRow
