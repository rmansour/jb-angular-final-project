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

exports.addProduct = async (req, res) => {
  console.log(req.body);

  await Products.create(req.body).then(result => {
    res.status(200).send(result);
  }).catch(err => {
    console.log(err);
    res.status(500).send(err, {message: "Insert: couldn't create product!"});
  });
};

exports.editProduct = async (req, res) => {
  console.log(req.body);
  try {
    await Products.update(req.body, {where: {id: req.body.id}}, {multi: true}).then(response => {
      res.status(200).send(JSON.stringify(response));
    });
  } catch (e) {
    console.log(e);
    res.status(500).send(JSON.stringify(e));
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

exports.uploadImage = (req, res) => {
  console.log(req.body);
  console.log(req.file);
  let obj = {
    type: req.file.mimetype,
    filename: req.file.filename
  };
  let options = {multi: true};
  let whereCondition = {where: {id: req.body.id}};

  Products.update(obj, whereCondition, options).then(result => {
    res.status(200).send(result);
  })
    .catch(e => {
      console.log(e);
      res.status(500).send(e, {message: `Couldn't update image`});
    });
};
