const express = require('express');
const router = express.Router();
const { register, login, getAllUsers, getSingleUser } = require('../controllers/userControllers')

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/").get(getAllUsers);
router.route("/:id").get(getSingleUser)

module.exports = router;