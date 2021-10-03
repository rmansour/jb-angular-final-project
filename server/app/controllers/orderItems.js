const db = require('../models');
const OrderItems = db.orderItems;
const Product = db.products;

exports.getOrderItemsByOrderId = async (req, res) => {
  console.log(req.body.orderId);

  try {
    // let stmt = await db.sequelize.query(`
    // select * from order_items where orderId = ${req.body.orderId};
    // `);
    // console.log(stmt[0]);
    // res.status(200).send(stmt[0]);
    await OrderItems.findAll({
      where: {orderId: req.body.orderId}, include: [Product]
    }).then(result => {
      res.status(200).send(result);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
