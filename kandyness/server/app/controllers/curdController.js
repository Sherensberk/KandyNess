const db = require("../models");
const Product = db.products;
const Loja = db.lojas;

const Op = db.Sequelize.Op;

// Função utilitária para enviar respostas de sucesso
const sendSuccessResponse = (res, data) => {
  res.send(data);
};

// Função utilitária para enviar respostas de erro
const sendErrorResponse = (res, message) => {
  res.status(500).send({
    message: message || "Ocorreu um erro durante a operação."
  });
};

// Função utilitária para criar um novo registro
const createRecord = (model, data, res) => {
  model
    .create(data)
    .then(data => {
      sendSuccessResponse(res, data);
    })
    .catch(err => {
      sendErrorResponse(res, err.message);
    });
};

// Função utilitária para atualizar um registro existente
const updateRecord = (model, id, data, res) => {
  model
    .update(data, {
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        sendSuccessResponse(res, {
          message: "Registro atualizado com sucesso."
        });
      } else {
        sendSuccessResponse(res, {
          message: `Não foi possível atualizar o regisaatro com id=${id}. Talvez o registro não tenha sido encontrado ou os dados da requisição estejam vazios!`
        });
      }
    })
    .catch(err => {
      sendErrorResponse(res, err.message);
    });
};

// Função utilitária para excluir um registro
const deleteRecord = (model, id, res) => {
  model
    .destroy({
      where: { id: id }
    })
    .then(num => {
      if (num == 1) {
        sendSuccessResponse(res, {
          message: "Registro excluído com sucesso!"
        });
      } else {
        sendSuccessResponse(res, {
          message: `Não foi possível excluir o registro com id=${id}. Talvez o registro não tenha sido encontrado!`
        });
      }
    })
    .catch(err => {
      sendErrorResponse(res, err.message);
    });
};

// Função utilitária para buscar todos os registros
const findAllRecords = (model, res) => {
  model
    .findAll()
    .then(data => {
      sendSuccessResponse(res, data);
    })
    .catch(err => {
      sendErrorResponse(res, err.message);
    });
};

// Função utilitária para buscar um único registro pelo ID
const findRecordById = (model, id, res) => {
  model
    .findByPk(id)
    .then(data => {
      if (data) {
        sendSuccessResponse(res, data);
      } else {
        res.status(404).send({
          message: `Não foi possível encontrar o registro com id=${id}.`
        });
      }
    })
    .catch(err => {
      sendErrorResponse(res, err.message);
    });
};

export const crudController = {
    create: createRecord,
    update: updateRecord,
    delete: deleteRecord,
    findAll: findAllRecords,
    findById: findRecordById
};

