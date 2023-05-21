module.exports = app => {
  const crudRoutes = require("./curdRoutes.js");
  const products = require("../controllers/product.controller.js");
  var router = require("express").Router();
  crudRoutes.createRoute(products, router);
  
  router.get("/loja/:loja", products.findAllByLojaId);
  
  app.use('/api/products', router);
};