const router = require("express").Router();
const {signin,signup}=require("../controller/authcontroller");

// @route /user/signin
// @desc sign in an user

router.post("/signin",signin )

// @route /user/signup
// @desc sign up an user

router.post("/signup",signup )

module.exports = router;