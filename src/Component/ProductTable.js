import React, { useState, useEffect } from 'react'
import ProductRow from './ProductRow'
import Axios from 'axios'

function ProductTable() {
  const [products, setProducts] = useState([])

  const [supplierID, setSupplierID] = useState('New Co. Ltd')

  useEffect(() => {
    const productUpdate = async () => {
      const data = await Axios.get('/api/products')
      setProducts(data)
    }
    productUpdate()
  }, [])

  // console.log(products)

  const handleProducts = (e) => {
    setSupplierID(e.target.value)
  }

  if (products.length === 0) {
    return <h1>Please wait while loading...</h1>
  }

  const suppliers = Array.from(
    new Set(products.data.map((product) => product.supplier))
  )

  const selectedSuppliersProducts = products.data.filter(
    (product) => product.supplier === supplierID
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
                  onChange={handleProducts}
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

export default ProductTable

// class ProductTable extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       products: [],
//       supplierID: "New Co. Ltd",
//       // nameID: 'mini wongle'
//     };

//     this.handleProducts = this.handleProducts.bind(this);
//     this.productUpdate = this.productUpdate.bind(this);
//   }

//   componentDidMount() {
//     this.productUpdate();
//   }

//   async productUpdate() {
//     const res = await Axios.get("/api/products");
//     const data = res.data;
//     this.setState({ products: data });
//   }

//   handleProducts(e) {
//     this.setState({
//       supplierID: e.target.value,
//       nameID: e.target.value,
//     });
//   }

//   render() {
//     console.log(this.state.products);
//     if (!this.state.products) return <h1>Please wait while loading...</h1>;

//     const suppliers = Array.from(
//       new Set(this.state.products.map((product) => product.supplier))
//     );

//     const selectedSuppliersProducts = this.state.products.filter(
//       (product) => product.supplier === this.state.supplierID
//     );

//     // const selectedSuppliersProductsNames = this.state.products.filter(
//     //   (product) => product.name === this.state.nameID
//     // )

//     return (
//       <div className="container-fluid">
//         <div className="row">
//           <div className="col-sm-12 col-md-12 main">
//             <h1 className="page-header">Product pricing</h1>
//             <form>
//               <div className="row">
//                 <div className="form-group col-md-6">
//                   <label htmlFor="selSupplier">Supplier</label>
//                   <select
//                     className="form-control"
//                     id="selSupplier"
//                     onChange={this.handleProducts}
//                   >
//                     {suppliers.map((supplier) => (
//                       <option key={supplier}>{supplier}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div className="form-group col-md-6">
//                   <label htmlFor="selProduct">Product</label>
//                   <select className="form-control" id="selProduct">
//                     {selectedSuppliersProducts.map((product) => (
//                       <option key={product.price}>{product.name}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </form>
//             <h2 className="sub-header">Product details</h2>
//             <div className="table-responsive">
//               <table className="table table-striped">
//                 <thead>
//                   <tr>
//                     <th>Supplier</th>
//                     <th>Product</th>
//                     <th>Price(£)</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   {selectedSuppliersProducts.map((product) => (
//                     <ProductRow product={product} key={product.price} />
//                   ))}
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

// export default ProductTable;
