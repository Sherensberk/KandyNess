module.exports = {
  HOST: "localhost",
  USER: "root",
  PASSWORD: "PUC@1234",
  DB: "kandyness",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
