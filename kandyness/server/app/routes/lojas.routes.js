
module.exports = app => {
  const crudRoutes = require("./curdRoutes.js");
  const lojas = require("../controllers/lojas.controller.js");
  var router = require("express").Router();
  crudRoutes.createRoute(lojas, router);
  //Rotas específicas:
  
  // lojasByUserID
  router.get("/lojasByUserID/:id", lojas.findAllNamesByUserId);

  app.use('/api/lojas', router);
};