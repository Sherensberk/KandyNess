
module.exports = app => {
    const crudRoutes = require("./curdRoutes.js");
    const users = require("../controllers/users.controller.js");
    var router = require("express").Router();
    crudRoutes.createRoute(users, router);
    //Rotas específicas:
    
    app.use('/api/users', router);
  };