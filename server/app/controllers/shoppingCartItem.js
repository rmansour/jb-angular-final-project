const db = require('../models');
const ShoppingCartItems = db.shoppingCartItem;
const Products = db.products;

exports.deleteShoppingCartItems = async (req, res) => {
  console.log(req.body);

  try {
    await ShoppingCartItems.destroy({where: {userId: req.body.userId}}).then((response) => {
      res.status(200).send(JSON.stringify(response));
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify(`Couldn't delete shopping cart items: ${e}`));
  }
};

exports.getShoppingItemsByUserID = async (req, res) => {
  console.log(req.query);

  try {
    await ShoppingCartItems.findAll({where: {userId: req.query.userId}, include: [Products]}).then(shoppingCartItem => {
      res.status(200).send(shoppingCartItem);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(`Couldn't get shopping cart item for userID: ${req.query.userId}, with the error: ${e}`);
  }
};

exports.upsertShoppingCartItem = (req, res) => {
  console.log(req.body);
  if (req.body.id === 0) {
    console.log(`ProductID can't be 0!`);
    res.status(500).send({message: `ProductID can't be 0!`});
    return;
  }

  // check if already exists
  ShoppingCartItems.findOne({where: {productId: req.body.productId, userId: req.body.userId}}).then(result => {
    if (result) {
      console.log('Product already exists, updating quantity...');
      ShoppingCartItems.update(req.body, {where: {productId: req.body.productId}}, {multi: true}).then(result => {
        res.status(200).send(result);
      });
    } else {
      ShoppingCartItems.create(req.body).then(result => {
        res.status(200).send(result);
      }).catch(error => {
        console.log(error);
        res.status(500).send({message: `Couldn't add item to your shopping cart!`});
      });
    }
  });
};
