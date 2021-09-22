const db = require('../models');
const Categories = db.categories;

exports.getCategories = async (req, res) => {
  console.log(req.query);

  try {
    await Categories.findAll().then(result => {
      res.status(200).send(result);
    })
  } catch (e) {
    console.log(e);
    res.status(500).send(`Couldn't fetch categories: ${e}`);
  }
}
