const productsController = require('../controllers/products');
const multer = require("multer");
const express = require("express");

const imageFilter = (req, file, cb) => {
  console.log('imageFilter');
  console.log(file.mimetype);
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb("Please only upload images.", false);
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    console.log(req.body, file, cb);
    cb(null, 'resources/uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, (Date.now()) + "-" + file.originalname);
  }
});

const upload = multer({storage: storage, fileFilter: imageFilter});

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.use(express.static('resources/uploads/'));
  app.post('/products/upload', upload.single('fileUpld'), productsController.uploadImage);

  app.get("/products/getProducts", productsController.getProducts);
  app.get("/products/getProductsByCategoryId", productsController.getProductsByCategoryId);

  app.post("/products/addProduct", upload.single('fileUpld'), productsController.addProduct);
  app.post("/products/editProduct", upload.single('fileUpld'), productsController.editProduct);
  app.post("/products/deleteProduct", productsController.deleteProduct);

};
