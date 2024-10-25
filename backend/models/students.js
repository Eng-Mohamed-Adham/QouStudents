const mongoose = require('mongoose')

const StudentSchema = new mongoose.Schema({
    id:{
        type: mongoose.Schema.Types.ObjectId,

    },
    name:{
        type:String,
        
    },
    password:{
        type:String
    },
    idNumber:{
        type:Number
    },
    course:[
        {
            type:String
        }
    ],
    dateOfCourse:[{
       type:String
    }],
    midtearm:{
        type:String
    },
    activity:{
        type:String
    },
    final:{
        type:String
    },
    tearm:{
        type: String
    },
    completed:{
        type:Boolean,
        default: false

    },
    from:{
        type:String
    }

})


module.exports = mongoose.model('Student',StudentSchema)