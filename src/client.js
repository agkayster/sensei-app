import ReactDOM from 'react-dom'
import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.css'
import ProductTable from './Component/ProductTable'

class Client extends Component {
  render() {
    return (
      <div>
        <HashRouter>
          <Route path='/' component={ProductTable} />
        </HashRouter>
      </div>
    )
  }
}

const container = document.getElementById('container')
ReactDOM.render(<Client />, container)
// const PRODUCTS = [
//   { supplier: 'New Co. Ltd', name: 'small wongle', stock: true, price: '5' },
//   { supplier: 'New Co. Ltd', name: 'large wongle', stock: false, price: '8' },
//   { supplier: 'New Co. Ltd', name: 'super wongle', stock: true, price: '12' },
//   { supplier: 'Old Co. Ltd', name: 'mini wongle', stock: false, price: '4' },
//   { supplier: 'Old Co. Ltd', name: 'small wongle', stock: true, price: '6' },
//   { supplier: 'Old Co. Ltd', name: 'large wongle', stock: false, price: '9' },
//   { supplier: 'Old Co. Ltd', name: 'super wongle', stock: true, price: '13' }
// ]

// const container = document.getElementById('container')
// ReactDOM.render(<ProductTable products={PRODUCTS} />, container)
