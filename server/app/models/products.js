module.exports = (sequelize, Sequelize) => {
  const Products = sequelize.define("products", {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    product_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    price: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    product_img_src: {
      type: Sequelize.STRING,
      allowNull: true
    }
  });

  return Products;
};
