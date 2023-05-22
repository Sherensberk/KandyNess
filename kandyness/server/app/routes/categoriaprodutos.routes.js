
module.exports = app => {
    const crudRoutes = require("./curdRoutes.js");
    const categoriaprodutos = require("../controllers/categoriaprodutos.controller.js");
    var router = require("express").Router();
    crudRoutes.createRoute(categoriaprodutos, router);
    //Rotas específicas:
    router.get("/product/:produto", categoriaprodutos.findByProduct);
    app.use('/api/categoriaprodutos', router);
  };