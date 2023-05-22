
module.exports = (sequelize, Sequelize, Categoria, Produto) => {
    const CategoriaProduto = sequelize.define("TBR_CategoriaProdutos", {
        cod: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            references:{
                model: Categoria,
                key: 'cod'
              }
            },
            
        categoria: {
            type: Sequelize.STRING,
            primaryKey: true,
            references:{
                model: Categoria,
                key: 'nome'
              }
        },
        loja: {
            type: Sequelize.STRING,
            primaryKey: true,
            references:{
              model: Produto,
              key: 'loja'
            }
          },
        produto: {
            type: Sequelize.STRING,
            primaryKey: true,
            references:{
                model: Produto,
                key: 'nome'
              }
        },
    },
    {
      timestamps: false,
    });
  
    CategoriaProduto.belongsTo(Categoria, {
        foreignKey: 'categoria',
        as: 'categoriaObj'
    });
    CategoriaProduto.belongsTo(Produto, {
        foreignKey: 'produto',
        as: 'produtoObj'
    });
    
    return CategoriaProduto;
  };
  