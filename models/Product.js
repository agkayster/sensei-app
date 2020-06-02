const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  supplier: {type: String, required: true},
  name: {type: String, required: true},
  stock: {type: Boolean, required: true},
  price: {type: Number}
})

module.exports = mongoose.model('Product', productSchema)