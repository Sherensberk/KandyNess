const db = require("../models");
const Categoriaproduto = db.categorias_produto;

// Create and Save a new Categoriaproduto
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Categoriaproduto
  const Categoriaproduto = {
    nome: req.body.nome,
    valor: req.body.valor,
    categoriaproduto: req.body.categoriaproduto
  };

  // Save Categoriaproduto in the database
  Categoriaproduto.create(Categoriaproduto)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categoriaproduto."
      });
    });
};

// Retrieve all Categoriaprodutos from the database.
exports.findAll = (req, res) => {
  Categoriaproduto.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categoriaprodutos."
      });
    });
};

exports.findByProduct = (req, res) => {
  const id = req.params.produto;
  Categoriaproduto.findAll({
    where: {
      produto: id
    }
  })
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Categoriaproduto with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categoriaproduto with id=" + id
      });
    });
};


// Find a single Categoriaproduto with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoriaproduto.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Categoriaproduto with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categoriaproduto with id=" + id
      });
    });
};

// Update a Categoriaproduto by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  console.log(req.body);
  // Categoriaproduto.update(req.body.new, {
  //   where: { 
  //     cod:req.body.old.cod,
  //     produto:req.body.old.produto }
  // })
  //   .then(num => {
  //     if (num == 1) {
  //       res.send({
  //         message: "Categoriaproduto was updated successfully."
  //       });
  //     } else {
  //       res.send({
  //         message: `Cannot update Categoriaproduto with id=${id}. Maybe Categoriaproduto was not found or req.body is empty!`
  //       });
  //     }
  //   })
  //   .catch(err => {
  //     res.status(500).send({
  //       message: "Error updating Categoriaproduto with id=" + id
  //     });
  //   });
};

// Delete a Categoriaproduto with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Categoriaproduto.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categoriaproduto was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Categoriaproduto with id=${id}. Maybe Categoriaproduto was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Categoriaproduto with id=" + id
      });
    });
};

// Delete all Categoriaprodutos from the database.
exports.deleteAll = (req, res) => {
  Categoriaproduto.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Categoriaprodutos were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categoriaprodutos."
      });
    });
};
