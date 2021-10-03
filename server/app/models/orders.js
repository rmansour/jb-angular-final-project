module.exports = (sequelize, Sequelize) => {
  const Orders = sequelize.define('orders', {
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    }, userId: {
      type: Sequelize.INTEGER, allowNull: false
    }, orderDate: {
      type: Sequelize.DATE, defaultValue: Sequelize.NOW, allowNull: false,
    }, shippingDate: {
      type: Sequelize.DATE, allowNull: false
    }, totalPrice: {
      type: Sequelize.DECIMAL(10, 2), allowNull: false
    }, shippingCity: {
      type: Sequelize.STRING, allowNull: false
    }, shippingAddress: {
      type: Sequelize.STRING, allowNull: false
    }, creditCardNumber: {
      type: Sequelize.STRING, allowNull: false
    }
  });

  return Orders;
};
