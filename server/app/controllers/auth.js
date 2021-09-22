const db = require("../models");
const config = require("../config/auth.config");
const User = db.users;

const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.checkUserExists = (req, res) => {
  console.log(req.body);
  User.findOne({
    where: {
      IDnum: req.body.idNum
    }
  }).then(user => {
    console.log(user);
    if (!user) res.status(200).send({message: 'No duplicates found, continue with registration!'}); else res.status(500).send({message: 'Duplicates found, cannot continue with registration!'})

  })
}

exports.signup = (req, res) => {
  console.log(req.body);
  try {
    User.create({
      IDnum: req.body.idNum,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: bcrypt.hashSync(req.body.password, 8),
      street: req.body.street,
      city: req.body.city,
      isAdmin: req.body.isAdmin
    }).then(() => {
      console.log('Created costumer successfully!');
      res.status(200).send({message: 'Created costumer successfully!'});
    })
  } catch (e) {
    console.log('Unable to create user!');
    res.status(500).send({message: 'Unable to create user!'})
  }
};

// exports.signup = (req, res) => {
//   // Save User to Database
//   User.create({
//     username: req.body.username,
//     email: req.body.email,
//     password: bcrypt.hashSync(req.body.password, 8),
//     street: req.body.street,
//     city: req.body.city,
//     isAdmin: req.body.isAdmin
//   })
//     .then(user => {
//       console.log('user:', user);
//       if (req.body.isAdmin === 1) {
//         User.findAll({
//           where: {
//             name: {
//               [Op.or]: req.body.username
//             }
//           }
//         }).then(roles => {
//           console.log('roles', roles);
//           user.setRoles(roles).then(() => {
//             res.send({message: "User was registered successfully!"});
//           });
//         });
//       } else {
//         // user role = 1
//         user.setRoles([0]).then(() => {
//           res.send({message: "User was registered successfully!"});
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({message: err.message});
//     });
// };

exports.signin = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(user => {
      if (!user) {
        return res.status(404).send({message: "User Not found."});
      }

      const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null, message: "Invalid Password!"
        });
      }

      const token = jwt.sign({id: user.id}, config.secret, {
        expiresIn: 86400 // 24 hours
      });

      //   const authorities = [];
      //   user.getRoles().then(roles => {
      //     for (let i = 0; i < roles.length; i++) {
      //       authorities.push("ROLE_" + roles[i].name.toUpperCase());
      //     }
      //     res.status(200).send({
      //       id: user.id, username: user.username, email: user.email, roles: authorities, accessToken: token
      //     });
      //   });
      // })
      //   // if(user.isAdmin === 0)
      //
      // .catch(err => {
      //   res.status(500).send({message: err.message});
      // });

      try {
        res.status(200).send({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          roles: user.isAdmin,
          accessToken: token
        })
      } catch (e) {
        console.log(e);
        res.status(500).send({message: e.message});
      }
    })
};

