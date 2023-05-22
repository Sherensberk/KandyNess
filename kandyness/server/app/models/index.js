const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.users = require("./users.model.js")(sequelize, Sequelize);
db.lojas = require("./lojas.model.js")(sequelize, Sequelize, db.users);
db.products = require("./product.model.js")(sequelize, Sequelize, db.lojas);
db.categorias = require("./categorias.model.js")(sequelize, Sequelize);
db.categorias_produto = require("./categoria_produtos.model.js")(sequelize, Sequelize, db.categorias, db.products);



module.exports = db;
