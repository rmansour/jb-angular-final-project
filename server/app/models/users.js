module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("users", {
    id: {
      type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false
    }, IDnum: {
      type: Sequelize.INTEGER, unique: true, allowNull: false
    }, firstName: {
      type: Sequelize.STRING, allowNull: false
    }, lastName: {
      type: Sequelize.STRING, allowNull: false
    }, isAdmin: {
      type: Sequelize.INTEGER, allowNull: false
    }, email: {
      type: Sequelize.STRING, allowNull: false
    }, password: {
      type: Sequelize.STRING, allowNull: false
    }, city: {
      type: Sequelize.STRING, allowNull: true
    }, street: {
      type: Sequelize.STRING, allowNull: true
    }, cartCreatedDate: {
      type: Sequelize.DATE, allowNull: true
    }
  });

  return User;
};
