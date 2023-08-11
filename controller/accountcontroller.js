let usermodel = require("../model/user");
const bcrypt = require('bcrypt');

let chnageName = async (req, res) => {
    let { newName } = req.body;
    try {

        const newuser = await usermodel.findOneAndUpdate({ _id: req.user }, { name: newName }).select({ password: 0 });

        console.log(newuser);

        res.json({ success: true, msg: newuser })
    } catch (e) {
        console.log(e)
    }
}



let changePassword = async (req, res) => {
    let { password, newPassword } = req.body;
    try {
        const olduser = await usermodel.findOne({ _id: req.user });

        if (await bcrypt.compare(password, olduser.password)) {

            const salt = await bcrypt.genSalt();
            const hash = await bcrypt.hash(newPassword, salt);
            const newuser = await usermodel.findOneAndUpdate({ _id: req.user },
                { password: hash }).select({ password: 0 });
            console.log(newuser);
            return res.json({ success: true, msg: newuser })
        }

        res.json({ success: false, msg: "wrong password" })
    } catch (e) {
        console.log(e)
    }
}

let getInfo = async (req, res) => {
    try {
        const user = await usermodel.findOne({ _id: req.user }).select("name mail");
        res.json({ success: true, msg: user })
    } catch (e) {
        console.log(e)
    }
}

module.exports = { chnageName, changePassword,getInfo };