
module.exports = app => {
    const crudRoutes = require("./curdRoutes.js");
    const categorias = require("../controllers/categorias.controller.js");
    var router = require("express").Router();
    crudRoutes.createRoute(categorias, router);
    //Rotas específicas:
    
    app.use('/api/categorias', router);
  };