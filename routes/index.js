
var express = require('express');
var router = express.Router();

const {
  createUser,
  getUsers,
  readUser,
  deleteUser,
  updateUser,
  getUserQRCodeImage,
} = require("../controllers/user");


router.all('*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


//READ AND CREATE USERS
router
    .route('/users')
    .get(getUsers)
    .post(createUser);
//READ,UPDATE,DELETE USER BY ID
router
  .route("/users/:Userid")
  .get(readUser)
  .put(updateUser)
  .delete(deleteUser);

router.get("/users/:user_name/qrc", getUserQRCodeImage);

module.exports = router;
