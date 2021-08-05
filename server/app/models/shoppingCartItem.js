module.exports = (sequelize, Sequelize) => {
  const ShoppingCartItem = sequelize.define("shopping_cart_item", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    userId: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    productId: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    qnt: {
      type: Sequelize.INTEGER,
      allowNull: false
    }
  });

  return ShoppingCartItem;
};
