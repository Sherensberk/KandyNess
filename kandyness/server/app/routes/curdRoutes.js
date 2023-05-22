const createRoute = (controller, router) => {
  router.post("/", controller.create);
  router.get("/", controller.findAll);
  router.get("/:id", controller.findOne);
  router.put("/:id", controller.update);
  router.delete("/:id", controller.delete);
  router.delete("/", controller.deleteAll);
};

module.exports = {
  createRoute
};
