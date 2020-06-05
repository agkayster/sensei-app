// eslint-disable-next-line quotes
const product = require("../models/Product")

function indexRoute(req, res, next) {
  product
    .find(req.query)
    .then((products) => res.json(products))
    .catch(next)
}

function showRoute(req, res, next) {
  product
    .find(req.query.supplier)
    .then((product) => {
      if(!product) return res.sendStatus(404)
      return res.json(product)
    })
    .catch(next)
}

module.exports = {
  index: indexRoute,
  show: showRoute
}
