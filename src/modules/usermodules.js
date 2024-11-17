const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    name:
    {
        type:String
    },
    email:
    {
        type:String
    },
    phone:
    {
        type:String
    },
    dob:{
        type:Date
    },
    password:{
        type:String
    }
})
module.exports = mongoose.model('User',userSchema)