const db = require("../models");
const Orders = db.orders;

exports.getOrdersByUser = async (req, res) => {
  console.log(req.query);

  try {
    await Orders.findAll({where: {userId: req.query.userId}}).then(orders => {
      for (let i = 0; i < orders.length; i++) {
        // console.log(orders[i].dataValues);
        orders[i].dataValues.creditCardNumber = orders[i].dataValues.creditCardNumber.substr(12,4);
      }
      console.log(orders);
      res.status(200).send(orders)
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.totalNumOfOrders = async (req, res) => {

  try {
    let stmt = 'select count(*) as totalOrders from orders;';
    let totalNumOfOrders = await db.sequelize.query(stmt);
    console.log(totalNumOfOrders[0]);
    res.status(200).send(totalNumOfOrders[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send({message: `${e}`});
  }
};

exports.addOrder = async (req, res) => {
  try {
    //   `id`,`userId`,`orderDate`,`shippingDate`,`totalPrice`,`shippingCity`,`shippingAddress`,`creditCardNumber`,`createdAt`,`updatedAt`
    let insertObj = {
      userId: req.body.userId,
      // orderDate: '',
      shippingDate: req.body.shippingDate,
      totalPrice: req.body.totalPrice,
      shippingCity: req.body.shippingCity,
      shippingAddress: req.body.shippingAddress,
      creditCardNumber: req.body.creditCardNumber
    }
    console.log('insertObj', insertObj);
    await Orders.create(insertObj).then(shoppingItem => {
      res.status(200).send(shoppingItem);
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
