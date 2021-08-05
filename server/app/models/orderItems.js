module.exports = (sequelize, Sequelize) => {
  const OrderItems = sequelize.define("order_items", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    orderId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    qnt: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    total: {
      type: Sequelize.VIRTUAL,
      get () {
        return this.getDataValue('price') * this.getDataValue('qnt');
      }
    }
  });

  return OrderItems;
};
