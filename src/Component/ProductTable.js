/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useState, useEffect } from 'react'
import ProductRow from './ProductRow'
import Axios from 'axios'

function ProductTable() {
  const [products, setProducts] = useState([])

  const [suppliers] = useState(['All', 'New Co. Ltd', 'Old Co. Ltd'])
  const [selectedSupplier, setSelectedSupplier] = useState('All')
  const [productsAll, setProductsAll] = useState([
    'All',
    'small wongle',
    'mini wongle',
    'large wongle',
    'super wongle'
  ])
  const [selectedProducts, setSelectedProducts] = useState('All')
  const [productDetails, setProductDetails] = useState([])

  useEffect(() => {
    const productUpdate = async () => {
      const res = await Axios.get('/api/products')
      setProducts(res.data)
    }
    productUpdate()
  }, [])

  console.log('get products', products)

  let newProducts = []

  // This controls the filter for all suppliers and affect changes in products and product details
  const handleSuppliersChange = (e) => {
    setSelectedSupplier(e.target.value)
    if (e.target.value === 'All') {
      newProducts = products.map((item) => item.name)
      newProducts.unshift('All')
      setProductsAll(Array.from(new Set(newProducts)))
      setProductDetails(products.map((product) => product))
    }
    if (e.target.value === 'New Co. Ltd') {
      newProducts = products
        .filter((item) => item.supplier === e.target.value)
        .map((item) => item.name)
      newProducts.unshift('All')

      setProductsAll(newProducts)
      setProductDetails(
        products.filter(
          (product) => product.supplier === e.target.value
        )
      )
    }
    if (e.target.value === 'Old Co. Ltd') {
      newProducts = products
        .filter((item) => item.supplier === e.target.value)
        .map((item) => item.name)
      newProducts.unshift('All')

      setProductsAll(newProducts)
      setProductDetails(
        products.filter(
          (product) => product.supplier === e.target.value
        )
      )
    }
  }

  // Controls filter for all products and implements filtering in Product details table
  const handleProductChange = (e) => {
    setSelectedProducts(e.target.value)
    if (e.target.value === 'All') {
      setProductDetails(products.filter((product) => product))
    }
    if (e.target.value === 'small wongle') {
      setProductDetails(
        products.filter((product) => product.name === e.target.value)
      )
    }
    if (e.target.value === 'mini wongle') {
      setProductDetails(
        products.filter((product) => product.name === e.target.value)
      )
    }
    if (e.target.value === 'large wongle') {
      setProductDetails(
        products.filter((product) => product.name === e.target.value)
      )
    }
    if (e.target.value === 'super wongle') {
      setProductDetails(
        products.filter((product) => product.name === e.target.value)
      )
    }
  }

  // useeffect to watch out for changes whn i want to filter using both supplier and product
  useEffect(() => {
    switch (selectedSupplier) {
      case 'All':
        if (
          selectedProducts === 'small wongle' ||
					selectedProducts === 'mini wongle' ||
					selectedProducts === 'large wongle' ||
					selectedProducts === 'super wongle'
        ) {
          setProductDetails(
            products.filter(
              (product) => product.name === selectedProducts
            )
          )
        } else {
          setProductDetails(products.filter((product) => product))
        }
        break
      case 'New Co. Ltd':
        if (
          selectedProducts === 'small wongle' ||
					selectedProducts === 'mini wongle' ||
					selectedProducts === 'large wongle' ||
					selectedProducts === 'super wongle'
        ) {
          setProductDetails(
            products.filter(
              (product) =>
                product.supplier === selectedSupplier &&
								product.name === selectedProducts
            )
          )
        } else {
          setProductDetails(
            products.filter(
              (product) =>
                product.supplier === selectedSupplier && product
            )
          )
        }
        break
      case 'Old Co. Ltd':
        if (
          selectedProducts === 'small wongle' ||
					selectedProducts === 'mini wongle' ||
					selectedProducts === 'large wongle' ||
					selectedProducts === 'super wongle'
        ) {
          setProductDetails(
            products.filter(
              (product) =>
                product.supplier === selectedSupplier &&
								product.name === selectedProducts
            )
          )
        } else {
          setProductDetails(
            products.filter(
              (product) =>
                product.supplier === selectedSupplier && product
            )
          )
        }
        break
      default:
        setProductDetails('')
    }
  }, [selectedSupplier, selectedProducts])

  if (products.length === 0) {
    return (
      <div className='spinner-border' role='status'>
        <span className='visually-hidden'></span>
      </div>
    )
  }

  return (
    <div className='container-fluid'>
      <div className='row'>
        <div className='col-sm-12 col-md-12 main'>
          <h1 className='page-header'>Product pricing</h1>
          <form>
            <div className='row'>
              <div className='form-group col-md-6'>
                <label htmlFor='selSupplier'>Supplier</label>
                <select
                  className='form-control'
                  id='selSupplier'
                  onChange={handleSuppliersChange}>
                  {suppliers.map((supplier) => (
                    <option value={supplier} key={supplier}>
                      {supplier}
                    </option>
                  ))}
                </select>
              </div>
              <div className='form-group col-md-6'>
                <label htmlFor='selProduct'>Product</label>
                <select
                  className='form-control'
                  id='selProduct'
                  onChange={handleProductChange}>
                  {productsAll.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </form>
          <h2 className='sub-header'>Product details</h2>
          <div className='table-responsive'>
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>Supplier</th>
                  <th>Product</th>
                  <th>Price(£)</th>
                </tr>
              </thead>
              <tbody>
                {productDetails.map((product) => (
                  <ProductRow
                    product={product}
                    key={product._id}
                  />
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
