
module.exports = (sequelize, Sequelize, User) => {
    const Loja = sequelize.define("tb_lojas", {
      nome: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      descricao: {
        type: Sequelize.STRING,
      },
      dono: {
        type: Sequelize.STRING,
        references: {
          model: User,
          key: 'matricula'
        }
      },
    },
    {
      timestamps: false,
    });
    
    Loja.belongsTo(User, {
        foreignKey: 'dono',
        as: 'donoObj'
    });
    return Loja;
  };
  