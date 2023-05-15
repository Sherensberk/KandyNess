module.exports = (sequelize, Sequelize) => {
  const Product = sequelize.define("tb_produto", {
    loja: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    nome: {
      type: Sequelize.STRING,
      primaryKey: true
    },
    valor: {
      type: Sequelize.FLOAT
    }
  },
  {
    timestamps: false,
  });

  return Product;
};
