const mongo = require('mongoose');


let userSchema = new mongo.Schema({
    name : {
        type:String,
    },
    mail:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    favMovies:{
        type:[String]
    }
})

let usermodel = new mongo.model('user',userSchema);

module.exports = usermodel;