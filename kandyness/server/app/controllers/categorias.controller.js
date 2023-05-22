const db = require("../models");
const Categoria = db.categorias;

// Create and Save a new Categoria
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Categoria
  const Categoria = {
    nome: req.body.nome,
    valor: req.body.valor,
    categoria: req.body.categoria
  };

  // Save Categoria in the database
  Categoria.create(Categoria)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Categoria."
      });
    });
};

// Retrieve all Categorias from the database.
exports.findAll = (req, res) => {
  Categoria.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Categorias."
      });
    });
};

// Find a single Categoria with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Categoria.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Categoria with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Categoria with id=" + id
      });
    });
};

// Update a Categoria by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Categoria.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categoria was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Categoria with id=${id}. Maybe Categoria was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Categoria with id=" + id
      });
    });
};

// Delete a Categoria with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Categoria.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Categoria was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Categoria with id=${id}. Maybe Categoria was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Categoria with id=" + id
      });
    });
};

// Delete all Categorias from the database.
exports.deleteAll = (req, res) => {
  Categoria.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Categorias were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Categorias."
      });
    });
};
