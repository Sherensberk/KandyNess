const db = require("../models");
const Loja = db.lojas;

// Create and Save a new Loja
exports.create = (req, res) => {
  // Validate request
  if (!req.body.nome) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Loja
  const Loja = {
    nome: req.body.nome,
    valor: req.body.valor,
    loja: req.body.loja
  };

  // Save Loja in the database
  Loja.create(Loja)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Loja."
      });
    });
};

// Retrieve all Lojas from the database.
exports.findAll = (req, res) => {
  Loja.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Lojas."
      });
    });
};

// Find a single Loja with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Loja.findByPk(id)
    .then(data => {
      if (data) {
        res.send(data);
      } else {
        res.status(404).send({
          message: `Cannot find Loja with id=${id}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error retrieving Loja with id=" + id
      });
    });
};

// Update a Loja by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Loja.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Loja was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Loja with id=${id}. Maybe Loja was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Loja with id=" + id
      });
    });
};

// Delete a Loja with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Loja.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Loja was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Loja with id=${id}. Maybe Loja was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Loja with id=" + id
      });
    });
};

// Delete all Lojas from the database.
exports.deleteAll = (req, res) => {
  Loja.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Lojas were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all Lojas."
      });
    });
};
