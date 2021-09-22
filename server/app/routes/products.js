const productsController = require('../controllers/products');


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  app.get("/products/getProducts", productsController.getProducts);
  app.get("/products/getProductsByCategoryId", productsController.getProductsByCategoryId);

  app.post("/products/addProduct", productsController.addProduct);
  app.post("/products/editProduct", productsController.editProduct);
  app.post("/products/deleteProduct", productsController.deleteProduct);

};
