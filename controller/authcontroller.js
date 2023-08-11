const userModel = require("../model/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")

const signup = async (req, res) => {
    let { mail, name, password } = req.body;
    success = false;
    try {
        // checking whether email already register?

        let temp = await userModel.findOne({ mail: mail });
        if (temp) {
            return res.status(405).json({ success, msg: "mail already registered" });
        }

        // *********************/

        let salt = await bcrypt.genSalt();
        let hash = await bcrypt.hash(password, salt);
        let user1 = new userModel({
            name,
            mail,
            password: hash,
            favMovies: []
        })
        let data = await user1.save();
        success = true;
        const encode = jwt.sign(data._id.valueOf(), process.env.JWT_SECRET);
        res.json({ success, msg: encode });
    } catch (e) {
        res.status(500).json({ success, msg: e.message })
    }
}

const signin = async (req, res) => {
    success = false;
    let { mail, password } = req.body;
    try {

        let data = await userModel.findOne({ mail: mail });

        if (data) {
            let pass = await bcrypt.compare(password, data.password);

            if (pass) {
                success = true;

                /************* */
                // /creating jwt for further 

                const encode = jwt.sign(data._id.valueOf(), process.env.JWT_SECRET);

                res.json({
                    success,
                    msg: encode
                });

                return;
            }

            return res.status(403).json({
                success,
                msg: "incorrect password"
            });

        }
        return res.status(403).json({ success, msg: "incorrect credentials" });
    } catch (e) {
        res.status(500).json({ success, msg: e.message });
    }


}

module.exports = { signin, signup }