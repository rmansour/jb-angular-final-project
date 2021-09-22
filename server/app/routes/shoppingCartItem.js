const shoppingCartItemController = require('../controllers/shoppingCartItem');

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.get('/shoppingCart/getShoppingCartItemsByUserID', shoppingCartItemController.getShoppingItemsByUserID);
  app.post('/shoppingCart/upsertShoppingCartItem', shoppingCartItemController.upsertShoppingCartItem);
  app.post('/shoppingCart/deleteShoppingCartItems', shoppingCartItemController.deleteShoppingCartItems);
}
