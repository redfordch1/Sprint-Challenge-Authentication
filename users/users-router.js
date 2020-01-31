const router = require("express").Router();
const restricted = require("../auth/authenticate-middleware");
const Users = require("./users-model.js");

//* GET REQUEST ============  /api/users ====================================
router.get("/", restricted, (req, res) => {
  Users.getUsers()
    .then((users) => {
      res.status(200).json(users);
    })
    .catch((err) => {
      res.status(400).json({
        errorMessage:
          "You need to be registered and logged in to see the users.",
      });
    });
});
//* =========================================================================

module.exports = router;
