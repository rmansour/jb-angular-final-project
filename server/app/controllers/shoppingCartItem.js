const db = require('../models');
const ShoppingCartItems = db.shoppingCartItem;
const Products = db.products;

exports.deleteShoppingCartItems = async (req, res) => {
  console.log(req.body);

  try {
    await ShoppingCartItems.destroy({where: {id: req.body.id}}).then((response) => {
      res.status(200).send(JSON.stringify(response));
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify(`Couldn't delete shopping cart items: ${e}`));
  }
};

exports.deleteShoppingCart = async (req, res) => {
  console.log(req.body);

  try {
    await ShoppingCartItems.destroy({where: {userId: req.body.userId}}).then(result => {
      res.status(200).send(JSON.stringify(result));
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify(`Couldn't delete shopping cart: ${e}`));
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

exports.upsertShoppingCartItem = async (req, res) => {
  if (req.body.id === 0) {
    await ShoppingCartItems.findOne({
      where: {
        productId: req.body.productId, userId: req.body.userId
      }
    }).then(foundOne => {
      if (foundOne) {
        console.log('Product already exists', foundOne.dataValues);
        res.status(500).send({message: `Product already in your cart, please edit the quantity there.`});
      } else {
        ShoppingCartItems.create(req.body).then(result => {
          console.log(result.dataValues);
          console.log(`Created new shopping cart item.`);
          res.status(200).send(result);
        }).catch(error => {
          console.log(error);
          res.status(500).send({message: `Couldn't add item to your shopping cart!`});
        });
      }
    });
  } else {
    await ShoppingCartItems.findOne({where: {id: req.body.id}}).then(foundOne => {
      if (foundOne) {
        ShoppingCartItems.update(req.body, {where: {id: foundOne.dataValues.id}}, {multi: true}).then(result => {
          console.log(result);
          res.status(200).send(result);
        });
      }
    });
  }
};

exports.calculateShoppingCartTotalPrice = async (req, res) => {
  console.log(req.body);

  try {
    let stmt = await db.sequelize.query(`
    select sum(s.qnt * p.price) as totalProductPrice
        from shopping_cart_items s
        inner join products p on s.productId = p.id
    where s.userId = ${req.body.userId};
    `);

    let tmpTotalPrice = stmt[0][0].totalProductPrice;
    res.status(200).send(tmpTotalPrice);
  } catch (e) {
    console.log(e);
    res.status(500).send({message: `Couldn't retrieve shopping cart items total price.`});
  }
};
