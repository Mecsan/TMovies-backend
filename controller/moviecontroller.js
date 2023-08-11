const usermodel = require("../model/user");

const addFav = async (req, res) => {

    let { id } = req.body;
    if (id) {

        let user = await usermodel.findOne({ _id: req.user });

        if (user.favMovies.find((movieid) => movieid == id)) {
            return res.json({ success: true, msg: "movie already in favourites" });
        }

        let newUser = await usermodel.updateOne({ _id: req.user }, {
            $push: {
                favMovies: id
            }
        })

        return res.json({ success: true, msg: "movie added successfully" })
    }

    res.json({ success: false, msg: "please provide id of movie" })

}

const getFav = async (req, res) => {

    let newUser = await usermodel.findOne({ _id: req.user });
    res.json({ success: true, msg: "this are your movies", favMovies: newUser.favMovies.reverse() })
}

const isFav = async (req, res) => {
    let { id } = req.params;
    let user = await usermodel.findOne({ _id: req.user });
    if (user.favMovies.find((ids) => ids == id)) {
        return res.json({ success: true, msg: true })
    }
    res.json({ success: true, msg: false })

}

const removeFav = async (req, res) => {
    let { id } = req.params;
    if (id) {
        let user = await usermodel.findOne({ _id: req.user });

        if (user.favMovies.find((movieid) => movieid == id)) {

            let newUser = await usermodel.updateOne({ _id: req.user }, {
                $pull: {
                    favMovies: id
                }
            })
            return res.json({ success: true, msg: "movie removed successfully" })
        }

        return res.json({ success: true, msg: "no such movie in favourites" });

    }

    res.json({ success: false, msg: "please provide id of movie" })

}

module.exports = { getFav, addFav, removeFav, isFav }