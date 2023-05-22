
module.exports = (sequelize, Sequelize) => {
    const Categoria = sequelize.define("TB_Categorias", {
      cod: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
        primaryKey: true
      },
    },
    {
      timestamps: false,
    });
    
    return Categoria;
  };
  