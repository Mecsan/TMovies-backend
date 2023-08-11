const router = require("express").Router();
const { changePassword, chnageName, getInfo } = require("../controller/accountcontroller");

// @route /user/change/name
// @desc to change the name of user
router.post("/change/name", chnageName);

// @route /user/change/password
// @desc to change the password of user
router.post("/change/password", changePassword);


// @route /user/info
// @desc to get the information of user
router.get("/info", getInfo);

module.exports = router;