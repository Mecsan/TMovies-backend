const router = require("express").Router();
const { getFav, addFav, removeFav, isFav } = require("../controller/moviecontroller")



// @route /movies/
// @desc to Get the fav movies of a user with valid auth header
router.get("/", getFav)

// @route /movies/
// @desc to add a new movie to fav movies
router.post("/", addFav)

// @route /movies/:id
// @desc to remove a  movie from fav movies
router.delete("/:id", removeFav)

// @route /movies/:id
// @desc to check whether current is fav or not
router.get("/:id", isFav);





module.exports = router;
