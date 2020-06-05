import React, { Component } from 'react'
import ProductRow from './ProductRow'
import Axios from 'axios'

class ProductTable extends Component {
  constructor(props) {
    super(props)
    this.state = {
      products: [],
      supplierID: 'New Co. Ltd'
    }

    this.handleProducts = this.handleProducts.bind(this)
    this.productUpdate = this.productUpdate.bind(this)
  }

  componentDidMount() {
    this.productUpdate()
  }

  productUpdate() {
    Axios.get('/api/products').then((res) =>
      this.setState({ products: res.data })
    )
  }

  handleProducts(e) {
    this.setState({
      supplierID: e.target.value
    })
  }

  render() {
    console.log(this.state.products)
    if (!this.state.products) return <h1>Please wait while loading...</h1>

    const suppliers = Array.from(
      new Set(this.state.products.map((product) => product.supplier))
    )

    const selectedSuppliersProducts = this.state.products.filter(
      (product) => product.supplier === this.state.supplierID
    )

    return (
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-12 col-md-12 main">
            <h1 className="page-header">Product pricing</h1>
            <form>
              <div className="row">
                <div className="form-group col-md-6">
                  <label htmlFor="selSupplier">Supplier</label>
                  <select
                    className="form-control"
                    id="selSupplier"
                    onChange={this.handleProducts}
                  >
                    {suppliers.map((supplier) => (
                      <option key={supplier}>{supplier}</option>
                    ))}
                  </select>
                </div>
                <div className="form-group col-md-6">
                  <label htmlFor="selProduct">Product</label>
                  <select className="form-control" id="selProduct">
                    {selectedSuppliersProducts.map((product) => (
                      <option key={product.price}>{product.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </form>
            <h2 className="sub-header">Product details</h2>
            <div className="table-responsive">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Supplier</th>
                    <th>Product</th>
                    <th>Price(£)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedSuppliersProducts.map((product) => (
                    <ProductRow product={product} key={product.price} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default ProductTable

// class ProductTable extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       products: [],
//       supplierID: 'New Co. Ltd'
//     }
//     this.handleProducts = this.handleProducts.bind(this)
//     this.productUpdate = this.productUpdate.bind(this)
//   }
//   componentDidMount() {
//     this.productUpdate()
//   }
//   productUpdate() {
//     Axios.get('/api/products').then((res) => {
//       this.setState({ products: res.data })
//     })
//   }
//   handleProducts(e) {
//     // here we change only the supplierID so we always have access to all
//     // the products without having to make more API calls.
//     this.setState({
//       supplierID: e.target.value
//     })
//   }
//   render() {
//     if (!this.state.products.length > 0)
//       return <h1>Please wait while loading...</h1>
//     // this will create a set from the product suppliers this makes sure that we only list each supplier
//     // once, then we make an array from the set so we can use array methods like map on the list of suppliers
//     const suppliers = Array.from(
//       new Set(this.state.products.map((product) => product.supplier))
//     )
//     // this does the work of filtering the products so that we have a list of the products that are from the
//     // seleected supplier and can map ovcer tham as needed and is separate from the list of all products that we have
//     // in state.
//     const selectedSuppliersProducts = this.state.products.filter(
//       (product) => product.supplier === this.state.supplierID
//     )
//     return (
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-sm-12 col-md-12 main">
//             <h1 className="page-header">Product pricing</h1>
//             <form className="form">
//               <div className="row">
//                 <div className="form-group col-md-6">
//                   <label>Supplier</label>
//                   <select
//                     className="form-control"
//                     onChange={this.handleProducts}
//                   >
//                     {
//                       // here we're just looping over the suppliers so the user can choose the supplier
//                       // they want to see the products of
//                     }
//                     {suppliers.map((supplier) => (
//                       <option key={supplier}>{supplier}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label>Product</label>
//                   <select className="form-control">
//                     {
//                       // this is left alone, I'm not sure what you want to do with this?
//                     }
//                     {selectedSuppliersProducts.map((product) => (
//                       <option key={product.price}>{product.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </form>
//             <h2 className="sub-header">Product details</h2>
//             <div className="table-responsive">
//               <table className="table is-bordered is-hoverable is-striped">
//                 <thead>
//                   <tr>
//                     <th>Supplier</th>
//                     <th>Product</th>
//                     <th>Price(£)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {
//                     // here we're only showing the products of the selects supplier
//                   }
//                   {selectedSuppliersProducts.map((product) => (
//                     <ProductRow product={product} key={product.price} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }
