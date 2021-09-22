const ordersController = require('../controllers/orders');


module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get('/orders/totalNumOfOrders', ordersController.totalNumOfOrders);
  app.get("/orders/getOrdersByUser", ordersController.getOrdersByUser);

  app.post("/orders/addOrder", ordersController.addOrder);
  // app.post("/orders/deleteOrder", ordersController.deleteProduct);

};
