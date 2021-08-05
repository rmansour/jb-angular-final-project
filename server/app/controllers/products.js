const db = require("../models");
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

exports.addProduct = async (req, res) => {
  console.log(req.body);

  Products.create(req.body).then(() => {
    res.status(200).send("Product added successfully!");
  }).catch(err => {
    console.log(err);
    res.status(500).send("Insert: couldn't create product!");
  })
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
