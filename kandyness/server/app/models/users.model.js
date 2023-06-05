module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("tb_usuarios", {
      matricula: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      nome: {
        type: Sequelize.STRING,
      },
      cpf: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      }
    },
    {
      timestamps: false,
    });
  
    return User;
  };
  