const db = require('../models');
const Orders = db.orders;

exports.getOrdersByUser = async (req, res) => {
  console.log(req.query);

  try {
    await Orders.findAll({where: {userId: req.query.userId}}).then(orders => {
      for (let i = 0; i < orders.length; i++) {
        // console.log(orders[i].dataValues);
        orders[i].dataValues.creditCardNumber = orders[i].dataValues.creditCardNumber.substr(12, 4);
      }
      console.log(orders);
      res.status(200).send(orders);
    });
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
  let insertObj = {
    userId: req.body.userId, // orderDate: '',
    shippingDate: req.body.shippingDate,
    totalPrice: req.body.totalPrice,
    shippingCity: req.body.shippingCity,
    shippingAddress: req.body.shippingAddress,
    creditCardNumber: req.body.creditCardNumber
  };

  if (Object.values(insertObj).some(x => x === null || x === '' || !x)) {
    console.log('Empty fields');
    res.status(500).send({message: `Can't create new order since one or more fields are empty!`});
    return;
  }

  try {
    //   `id`,`userId`,`orderDate`,`shippingDate`,`totalPrice`,`shippingCity`,`shippingAddress`,`creditCardNumber`,`createdAt`,`updatedAt`

    console.log('insertObj', insertObj);
    db.sequelize.query('CALL sp_moveCartToOrderItems (:pUserId, :pShippingDate, :pTotalPrice, :pShippingAddress, :pShippingCity, :pCreditCardNumber)', {
      replacements: {
        pUserId: `${insertObj.userId}`,
        pShippingDate: `${insertObj.shippingDate}`,
        pTotalPrice: `${insertObj.totalPrice}`,
        pShippingAddress: `${insertObj.shippingAddress}`,
        pShippingCity: `${insertObj.shippingCity}`,
        pCreditCardNumber: `${insertObj.creditCardNumber}`
      }
    })
      .then(v => {
        console.log(v);
        res.status(200).send(v);
      });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};
