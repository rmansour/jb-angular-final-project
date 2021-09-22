const categoriesController = require('../controllers/categories');


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/categories/getCategories", categoriesController.getCategories);

  // app.post("/categories/addProduct", categoriesController.);
  // app.post("/categories/deleteProduct", categoriesController.);

};
