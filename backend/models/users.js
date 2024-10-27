const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name:{
        type:String,
        require: true
    },
    password:{
        type:String,
        require:true
    },
   
    roles:[
        {
            type:String,
            default: "Employee"
        }
    ],
    image : String

})

module.exports = mongoose.model('User',UserSchema)