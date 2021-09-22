const {verifySignUp} = require("../middleware");
const controller = require("../controllers/auth");

module.exports = function (app) {
  app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "x-access-token, Origin, Content-Type, Accept");
    next();
  });

  app.post('/api/auth/checkDuplicateEmailOrId', [verifySignUp.checkDuplicateEmailOrId]);

  app.post("/api/auth/signup", [verifySignUp.checkDuplicateEmailOrId, verifySignUp.checkRolesExisted], controller.signup);

  app.post("/api/auth/signin", controller.signin);
};
