// eslint-disable-next-line quotes
const product = require("../models/Product")

function indexRoute(req, res, next) {
  product
    .find(req.query)
    .then((products) => res.json(products))
    .catch(next)
}

module.exports = {
  index: indexRoute
}
