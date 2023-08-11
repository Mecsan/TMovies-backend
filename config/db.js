const mongo = require("mongoose");

let connection = mongo.connect(process.env.MONGO_URI).then(() => {
    console.log("database connected")
}).catch((e) => {
    console.log(e);
})

module.exports = connection;
