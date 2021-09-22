const { authJwt } = require("../middleware");
const usersController = require('../controllers/user');
const authController = require("../controllers/auth");

module.exports = function(app) {
    app.use(function(req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.get(
        "/api/test/user",
        [authJwt.verifyToken],
        usersController.userBoard
    );

    app.get(
        "/api/test/admin",
        [authJwt.verifyToken],
        usersController.adminBoard
    );

    app.post('/users/signup', authController.signup);
    app.get('/users/getAllUsers', usersController.getAllUsers);
    app.post('/users/deleteUser', usersController.deleteUser);
    app.post('/users/updateUser', usersController.updateUser);
};
