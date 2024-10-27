const mongoose = require('mongoose')


DATABASE_URL = 'mongodb+srv://pythonh37:root@cluster0.xow51.mongodb.net/Alkebeer?retryWrites=true&w=majority&authSource=admin'

const connectDB = async () => {
    try{
        await mongoose.connect(DATABASE_URL)
    }catch(err) {
        console.log(err)
    }
}

module.exports = connectDB