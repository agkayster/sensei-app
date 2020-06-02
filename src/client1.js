import React from "react";
import ReactDOM from "react-dom";

class ProductCompanyRow extends React.Component {
  render() {
    const company = this.props.company;
    return (
        <form className='form'>
            <label>
                Company:
            </label>
            <div className='select'>
                <select>
                    <option>{company}</option>
                </select>
            </div>
        </form>
    //   <tr>
    //     <th colSpan="2">{company}</th>
    //   </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    const product = this.props.product;
    const name = product.stock ? (
      product.name
    ) : (
      <span style={{ color: "brown" }}>{product.name}</span>
    );
    return (
      <form className="form">
        <label>Product:</label>
        <div className="select">
          <select>
            <option>{name}</option>
          </select>
        </div>
        <label>Price:</label>
        <div className="select">
          <select>
            <option>{product.price}</option>
          </select>
        </div>
      </form>
      //   <tr>
      //     <td>{name}</td>
      //     <td>{product.price}</td>
      //   </tr>
    );
  }
}

class ProductTable extends React.Component {
  render() {
    const rows = [];
    let lastCompany = null;

    const filterSearchText = this.props.filterSearchText;
    const inStock = this.props.inStock;

    this.props.products.map((product) => {
      if (product.name.indexOf(filterSearchText) === -1) {
        return;
      }
      if (inStock && !product.stock) {
        return;
      }
      if (product.company !== lastCompany) {
        rows.push(
          <ProductCompanyRow company={product.company} key={product.company} />
        );
      }
      rows.push(<ProductRow product={product} key={product.id} />);
      lastCompany = product.company;
    });

    return (
      <table>
        <thead>
          <tr>
            <th>Company</th>
            <th>Product</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends React.Component {
  constructor(props) {
    super(props);

    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleFilterSearchTextChange = this.handleFilterSearchTextChange.bind(
      this
    );
  }

  handleFilterSearchTextChange(e) {
    this.props.onFilterSearchTextChange(e.target.value);
  }

  handleInStockChange(e) {
    this.props.onInStockChange(e.target.checked);
  }

  render() {
    return (
      <form>
        <input
          type="text"
          placeholder="Mini Wongle..."
          value={this.props.filterSearchText}
          onChange={this.handleFilterSearchTextChange}
        />
        <p>
          <input
            type="checkbox"
            checked={this.props.inStock}
            onChange={this.handleInStockChange}
          />
          {""}
          show only items in stock:
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);

    this.state = { filterSearchText: "", inStock: false };

    this.handleInStockChange = this.handleInStockChange.bind(this);
    this.handleFilterSearchTextChange = this.handleFilterSearchTextChange.bind(
      this
    );
  }

  handleFilterSearchTextChange(filterSearchText) {
    this.setState({ filterSearchText: filterSearchText });
  }

  handleInStockChange(inStock) {
    this.setState({ inStock: inStock });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterSearchText={this.state.filterSearchText}
          inStock={this.state.inStock}
          onFilterSearchTextChange={this.handleFilterSearchTextChange}
          onInStockChange={this.handleInStockChange}
        />
        <ProductTable
          products={this.props.products}
          filterSearchText={this.state.filterSearchText}
          inStock={this.state.inStock}
        />
      </div>
    );
  }
}

const PRODUCTS = [
  { company: "New Co. Ltd", name: "small wongle", stock: true, price: "£5" },
  { company: "New Co. Ltd", name: "large wongle", stock: false, price: "£8" },
  { company: "New Co. Ltd", name: "super wongle", stock: true, price: "£12" },
  { company: "Old Co. Ltd", name: "mini wongle", stock: false, price: "£4" },
  { company: "Old Co. Ltd", name: "small wongle", stock: true, price: "£6" },
  { company: "Old Co. Ltd", name: "large wongle", stock: false, price: "£9" },
  { company: "Old Co. Ltd", name: "super wongle", stock: true, price: "£13" },
];
ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("container")
);
