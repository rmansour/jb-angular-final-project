const db = require('../models');
const Products = db.products;

exports.getProducts = async (req, res) => {
  console.log(req.body);

  try {
    await Products.findAll().then(products => {
      res.status(200).send(products);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.getProductsWithCategories = async (req, res) => {
  console.log(req.body);

  try {
    let stmt = await db.sequelize.query(`
      select *
from products p
         inner join categories c on p.category_id = c.id
where c.id = p.category_id;
    `);

    res.status(200).send(stmt[0]);
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.getProductsByCategoryId = async (req, res) => {
  console.log(req.body);

  try {
    await Products.findAll({where: {category_id: req.query.category_id}}).then(products => {
      res.status(200).send(products);
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(e);
  }
};

exports.upsertProduct = (req, res) => {
  if (req.body) req.body.id = Number(req.body.id);
  if (req.file) req.file.id = Number(req.file.id);
  if (req.body.id === 0 && !req.file) {
    console.log(`abc`);
    res.status(500).send({message: `File not provided while adding a new product!`});
  } else {
    try {
      let whereCondition = {where: {id: req.body.id}};
      let obj = {};

      if (req.file) {
        obj = {
          product_name: req.body.product_name,
          category_id: req.body.category_id,
          price: req.body.price,
          type: req.file.mimetype,
          filename: req.file.filename
        };
      } else {
        obj = {
          product_name: req.body.product_name,
          category_id: req.body.category_id,
          price: req.body.price,
          type: req.body.type,
          filename: req.body.filename
        };
      }

      if (req.body.id === 0) {
        Products.create(obj).then(result => {
          res.status(200).send(result);
        }).catch(err => {
          console.log(err);
          res.status(500).send(err, {message: `Error creating new product!`});
        });
      } else {
        Products.findOne(whereCondition, {query: {raw: true}}, {multi: true})
          .then(response => {
            Products.update(obj, whereCondition).then(response => {
              res.status(200).send(response);
            }).catch(err => {
              res.status(500).send(err);
            });
          }).catch(err => {
          console.log(err, `Couldn't find/update product`);
          res.status(500).send(err, {message: `Couldn't find/update product`});
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).send(e, {message: `Upsert failed!`});
    }
  }
};

exports.deleteProduct = async (req, res) => {
  console.log(req.body);

  try {
    await Products.destroy({where: {id: req.body.id}}).then(result => {
      res.status(200).send(JSON.stringify(result));
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify(e));
  }
};
