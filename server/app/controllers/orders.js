const db = require("../models");
const Orders = db.orders;

exports.getOrdersByUser = async (req, res) => {
  console.log(req.query);

  try {
    await Orders.findAll({where: {userId: req.query.userId}}).then(orders => {
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
  console.log(req.body);
  try {
    await Orders.create(req.body, {multi: true}).then(shoppingItem => {
      res.status(200).send(shoppingItem);
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
}
