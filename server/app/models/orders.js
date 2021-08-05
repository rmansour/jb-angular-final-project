module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define("orders", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    orderDate: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    shippingDate: {
      type: Sequelize.DATE,
      allowNull: false
    },
    totalPrice: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    shippingCity: {
      type: Sequelize.STRING,
      allowNull: false
    },
    shippingAddress: {
      type: Sequelize.STRING,
      allowNull: false
    },
    lastFourDigitsOfPaymentMethod: {
      type: Sequelize.STRING,
      allowNull: false
    },
  });

  return Orders;
};
