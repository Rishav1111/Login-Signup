const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    fullname :String,
    username: String,
    email: {
        type:String,
        unique: true
    },
    phonenumber:{
        type:Number,
        unique:true
    },
    password:String,
    confirmpassword:String

})

const Register = new mongoose.model("signups", UserSchema);

module.exports = Register;