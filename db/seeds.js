
const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const Product = require('../models/Product')
const productsData = require('./data/productsData')
const { dbURI } = require('../config/environment')

mongoose.connect(dbURI, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true
})
  .then(() => mongoose.connection.db.dropDatabase())
  .then(() => Product.create(productsData))
  .then(() => console.log('Succesfully seeded!'))
  .catch((err) => console.log(err))
  .finally(() => mongoose.connection.close())