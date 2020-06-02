import React, { Component } from 'react'
import ProductRow from './ProductRow'
import Axios from 'axios'


class ProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = { 
      products: []
    }
  }

  componentDidMount() {
    this.productUpdate()
  }

  productUpdate (){
    Axios.get('/api/products')
      .then((res) => this.setState({products: res.data}))
  }


  render() { 
    const rows = []
    this.state.products.filter((product) => {
      rows.push(<ProductRow product={product} key={product.price} />)
    })
    return (
      <table className="table is-bordered is-hoverable is-striped">
        <thead>
          <tr>
            <th>Supplier</th>
            <th>Product</th>
            <th>Price(£)</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    )
  }
}
 
export default ProductTable



// class ProductTable extends Component {
//   //ProductTable passes props to Product Row
//   render() {
//     const rows = []
//     this.props.products.filter((product) => {
//       rows.push(<ProductRow product={product} key={product.price} />)
//     })
//     return (
//       <table className="table is-bordered is-hoverable is-striped">
//         <thead>
//           <tr>
//             <th>Supplier</th>
//             <th>Product</th>
//             <th>Price(£)</th>
//           </tr>
//         </thead>
//         <tbody>{rows}</tbody>
//       </table>
//     )
//   }
// }

// export default ProductTable
