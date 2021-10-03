const db = require('../models');
const Users = db.users;
const Orders = db.orders;
const ShoppingCartItems = db.shoppingCartItem;

exports.userBoard = (req, res) => {
  res.status(200).send('User Page');
};

exports.adminBoard = (req, res) => {
  res.status(200).send('Admin Page');
};

exports.getAllUsers = async (req, res) => {
  console.log(req.query);

  await Users.findAll().then(users => {
    res.status(200).send(users);
  }).catch(error => {
    console.log(error);
    res.status(500).send('An error occurred:', error);
  });
};

exports.deleteUser = async (req, res) => {
  console.log(req.body);

  try {
    let userId = req.body.id;
    let userOrders = await Orders.findAll({where: {userId: userId}}, {query: {raw: true}}).then(() => {
      Orders.destroy({where: {userId: userId}});
    });

    let userShoppingCartItems = await ShoppingCartItems.findAll({where: {userId: userId}}, {query: {raw: true}}).then(() => {
      ShoppingCartItems.destroy({where: {userId: userId}});
    });

    if (!userOrders && !userShoppingCartItems) {
      Users.destroy({where: {id: userId}}).then((response) => {
        res.status(200).send(JSON.stringify(response));
      });
    } else {
      res.status(500).send(`Couldn't delete user.`);
    }
  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(JSON.stringify(error));
  }
};

exports.updateUser = async (req, res) => {
  console.log('req.body', req.body);

  const updateObj = req.body;
  if (Object.values(updateObj).some(x => x === null || x === '' || !x)) {
    console.log('Empty fields');
    res.status(500).send({message: `Can't update since one or more fields are empty!`});
    return;
  }

  try {
    await Users.update(updateObj, {where: {id: updateObj.userId}}, {multi: true}).then((response) => {
      res.status(200).send(JSON.stringify(response));
    });

  } catch (error) {
    console.log(JSON.stringify(error));
    res.status(500).send(JSON.stringify(error));
  }
};

exports.getUserById = async (req, res) => {
  try {
    await Users.findOne({
      where: {id: req.body.id}, attributes: ['email', 'city', 'street', 'IDnum', 'firstName', 'lastName']
    }).then(result => {
      res.status(200).send(result);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send({message: 'Can\'t retrieve user by id.'});
  }
};
