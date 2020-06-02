import React, { Component } from 'react'


class ProductRow extends Component {
  //this.props.product only works because of Product Table class component
  render() {
    const product = this.props.product
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
}

export default ProductRow
