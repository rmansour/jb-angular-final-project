const db = require("../models");
const User = db.users;

checkDuplicateEmailOrId = (req, res, next) => {
  if (isNaN(req.body.idNum) || !req.body.email ) {
    res.status(400).send({message: `ID number field and/or E-Mail is missing!`});
    return;
  }

  User.findOne({
    where: {
      IDnum: req.body.idNum
    }
  }).then(userID => {
    console.log(userID);
    if (userID || userID === '') {
      console.log('if (userID)');
      res.status(400).send({
        message: "Failed! Invalid user ID or already exists!"
      });
      return;
    }

    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(email => {
      console.log(email);
      if (email || email === '') {
        console.log('if (email)');
        res.status(400).send({
          message: "Failed! Email is already in use!"
        });
      } else {
        res.status(200).send({message: 'No duplicates found, you may continue!'});
      }
    });
  });
};

checkRolesExisted = (req, res, next) => {
  if (req.body.isAdmin !== 0 || req.body.isAdmin !== 1) {
    res.status(400).send({
      message: "Failed! Role does not exist = " + req.body.isAdmin
    });
  }

  next();
};

const verifySignUp = {
  checkDuplicateEmailOrId: checkDuplicateEmailOrId, checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
