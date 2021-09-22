const config = require("../config/db.config");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * With `through`, `foreignKey`, `otherKey`, we’re gonna have a new table user_roles as connection between users and roles table via their primary key as foreign keys.
 */
db.users = require("./users")(sequelize, Sequelize);
db.categories = require('./categories')(sequelize, Sequelize);
db.products = require('./products')(sequelize, Sequelize);
db.orders = require('./orders')(sequelize, Sequelize);
db.orderItems = require('./orderItems')(sequelize, Sequelize);
db.shoppingCartItem = require('./shoppingCartItem')(sequelize, Sequelize);


db.shoppingCartItem.belongsTo(db.products);
db.orderItems.belongsTo(db.products);
db.orderItems.belongsTo(db.orders);
db.orders.belongsTo(db.users);

db.ROLES = ["user", "admin"];

module.exports = db;
