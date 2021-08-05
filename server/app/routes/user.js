const { authJwt } = require("../middleware");
const usersController = require('../controllers/user');

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
        [authJwt.verifyToken, authJwt.isAdmin],
        usersController.adminBoard
    );
};
