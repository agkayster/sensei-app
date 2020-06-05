const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  supplier: {type: String, required: true},
  name: {type: String, required: true},
  stock: {type: Boolean, required: true},
  price: {type: Number}
},{
  toJSON: {
    virtuals: true,
    transform (doc, json){
      delete json.__v
      delete json.id 
      return json
    }
  }
})

// productSchema.set('toJSON', {
//   virtuals: true, 
//   transform(doc, json){
//     delete json.__v
//     delete json.id 
//     return json
//   }
// })

module.exports = mongoose.model('Product', productSchema)