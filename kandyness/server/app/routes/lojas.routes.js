
module.exports = app => {
  const crudRoutes = require("./curdRoutes.js");
  const lojas = require("../controllers/lojas.controller.js");
  var router = require("express").Router();
  crudRoutes.createRoute(lojas, router);
  //Rotas específicas:
  
  app.use('/api/lojas', router);
};