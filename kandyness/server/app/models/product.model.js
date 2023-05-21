
module.exports = (sequelize, Sequelize, Loja) => {
  const Product = sequelize.define("tb_produto", {
    loja: {
      type: Sequelize.STRING,
      primaryKey: true,
      references:{
        model: Loja,
        key: 'nome'
      }
    },
    nome: {
      type: Sequelize.STRING,
      primaryKey: true,
    },
    valor: {
      type: Sequelize.FLOAT
    },
  },
  {
    timestamps: false,
  });

  Product.belongsTo(Loja, {
    foreignKey: 'loja',
    as: 'lojaObj'
  });

  return Product;
};
