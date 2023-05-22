
module.exports = (sequelize, Sequelize, Loja) => {
  const Product = sequelize.define("TB_Produtos", {
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
    descricao: {
      type: Sequelize.STRING,
    },
    image:{
      type: Sequelize.STRING,
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
